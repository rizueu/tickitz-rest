// Import Modules
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.APP_KEY);
const jwt = require("jsonwebtoken");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");
// Import Model
const User = require("../models/Auth");
// Import Helpers
const {
  registerValidation,
  loginValidation,
  newPasswordValidation,
} = require("../helpers/Validation");
const upload = require("../helpers/Upload");
const transporter = require("../config/Mail");
const response = require("../helpers/Response");

exports.register = async (req, res) => {
  // Validate the body request
  const { error } = registerValidation(req.body);
  if (error) {
    const { message } = error.details[0];
    return response(res, 400, false, message);
  }
  try {
    // Checking if user is already in the database
    const emailExist = await User.findAll({ email: req.body.email });
    if (emailExist.length > 0) {
      return response(res, 400, false, "Email already exists");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const results = await User.create({
      email: req.body.email,
      password: hashedPassword,
      verified: false,
    });

    if (results.affectedRows > 0) {
      const newUser = await User.findAll({ id: results.insertId });
      var html = `<a href="http://localhost:3000/auth/activate?id=${
        newUser[0].id
      }&key=${cryptr.encrypt(
        newUser[0].email
      )}">http://localhost:3000/auth/activate?id=${
        newUser[0].id
      }&key=${cryptr.encrypt(newUser[0].email)}</a>`;
      if (req.query.v === "Mobile") {
        const template = fs.readFileSync(
          path.resolve(__dirname, "../assets/template/register.html"),
          "utf-8"
        );
        const url = `${process.env.APP_URL}/redirect/activate?id=${newUser[0].id}`;
        html = mustache.render(template, { url });
      }
      transporter.sendMail(
        {
          from: `${process.env.SMTP_USERNAME}`,
          to: `${newUser[0].email}`,
          subject: "Thanks, for registering your account",
          html,
        },
        (error, info) => {
          if (error) return response(res, 500, false, error.response);
          return response(
            res,
            201,
            true,
            "Thanks, your registered. please check your email to verify your account",
            info
          );
        }
      );
    }
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

exports.activate = async (req, res) => {
  const { id, email } = req.body;
  if (!id && !email) {
    return response(res, 400, false, "Invalid Request");
  }
  try {
    const results = await User.activate(id);
    return response(
      res,
      200,
      true,
      "Congratulations, your account has been activated!"
    );
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

exports.login = async (req, res) => {
  // Validate the body request
  const { error } = loginValidation(req.body);
  if (error) {
    const { message } = error.details[0];
    return response(res, 400, false, message);
  }
  try {
    // Checking the email and compare hashed password in database
    const user = await User.findAll({ email: req.body.email });
    if (
      user.length < 1 ||
      !(await bcrypt.compare(req.body.password, user[0].password))
    ) {
      return response(res, 400, false, "The credentials entered are wrong.");
    }
    // Check user's account verified
    if (user[0].verified === 0) {
      return response(res, 400, false, "You must verifying, your account!");
    }
    // Create and assign a token
    const { APP_KEY, APP_URL } = process.env;
    const token = jwt.sign(
      {
        id: user[0].id,
        fullName: `${user[0].firstName} ${user[0].lastName}`,
        role: user[0].role,
        picture: `${APP_URL}/profile/${user[0].picture}`,
      },
      APP_KEY
    );
    return response(res, 200, true, "Login successfuly", {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
      token,
    });
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  const { id, email } = req.query;
  if (id && email) {
    // Validate the body request
    const { error } = newPasswordValidation(req.body);
    if (error) {
      const { message } = error.details[0];
      return response(res, 400, false, message);
    }
    try {
      // Checking the email
      const userEmail = await User.findOne({ email: email });
      if (userEmail.length < 1) return response(res, 400, false, "Bad Request");
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.password, salt);
      const results = await User.setNewPassword({ id, newPassword });
      if (results.affectedRows > 0) {
        return response(res, 200, true, "Successfully changed password");
      }
    } catch (error) {
      return response(res, 500, false, error.message);
    }
  } else {
    // Validate the body request
    if (!req.body.email)
      return response(res, 400, false, "Form cannot be empty");
    try {
      // Checking if user is already in the database
      const userEmail = await User.findAll({ email: req.body.email });
      if (userEmail.length < 1)
        return response(res, 400, false, "Email has never been registered.");
      // send mail with defined transport object
      transporter.sendMail(
        {
          from: `${process.env.SMTP_USERNAME}`,
          to: `${userEmail[0].email}`,
          subject: "Forgot Password",
          html: `<a href="http://localhost:3000/auth/reset?id=${
            userEmail[0].id
          }&key=${cryptr.encrypt(
            userEmail[0].email
          )}">http://localhost:3000/auth/reset?id=${
            userEmail[0].id
          }&key=${cryptr.encrypt(userEmail[0].email)}</a>`,
        },
        (error, info) => {
          if (error) return response(res, 500, false, error.response);
          return response(res, 202, true, info);
        }
      );
    } catch (error) {
      return response(res, 500, false, error.message);
    }
  }
};

exports.editUser = async (req, res) => {
  try {
    const previousResult = await User.getUserByCondition({
      id: req.data.id,
    });

    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    };

    const results = await User.update(req.data.id, req.body.email, body);

    if (!results) {
      return response(res, 400, false, "Failed to edit user account");
    } else {
      return response(res, 200, true, "Your account has been updated");
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Server Error");
  }
};

exports.editPassword = async (req, res) => {
  if (req.body.password.length > 15 || req.body.password.length < 5) {
    return response(
      res,
      400,
      false,
      "Password min 5 character and max 15 character"
    );
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 8);
    const body = { password: hash };
    const results = await User.update(req.params.id, req.params.email, body);

    if (!results) {
      return response(res, 400, false, "Failed to edit password");
    } else {
      return response(res, 200, true, "Password has been updated");
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Server Error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await User.getUserByCondition({
      id: req.params.id,
    });

    if (!result) {
      return response(
        res,
        400,
        false,
        `User with id ${req.params.id} unavailable`
      );
    } else {
      const data = {
        ...result[0],
        poster: process.env.APP_URL.concat("/uploads/", result[0].poster),
      };
      return response(
        res,
        200,
        true,
        "Successfully to get user with id " + req.params.id,
        data
      );
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Server Error");
  }
};

exports.uploadPhoto = async (req, res) => {
  const picture = await upload(req, "profile");

  if (typeof picture === "object") {
    return response(res, picture.status, picture.success, picture.message);
  }

  try {
    const results = await User.updatePhoto(req.data.id, {
      picture: picture,
    });

    if (!results) {
      fs.unlink("./public/uploads/" + picture, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return response(res, 400, false, "Failed to upload profile");
    } else {
      return response(res, 200, true, "Success to upload profile");
    }
  } catch (error) {
    response(res, 500, false, "Server Error");
    throw new Error(error);
  }
};
