// import all modules
const express = require("express");

// init router
const router = express.Router();

router.get("/:method", (req, res) => {
  const { method } = req.params;
  const { id } = req.query;

  res.redirect(`tickitz://${method}/${id}`);
});

module.exports = router;
