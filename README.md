# BACKEND APP WITH NODE AND MYSQL

This is non-optimized minimal backend app with mysql and node. Backend app theme is "Ticket Order"

## Requirements

- NodeJS v12 LTS
- MySQL v8

## How To Run This App

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your Mysql credentials
- Open your terminal in this project and run
  ```
  npm i
  ```
- And then
  ```
  npx nodemon
  ```

## API SPECS

- POST `/auth/register` Route for signup an account
- POST `/auth/login` Route for sign into system
- PATCH `/auth/forgot_password` Route for reset password

- GET `/api/genre/:genre` Route for get Movie by its genre **(Not done yet)**
- GET `/api/movies` Route for get all Movie **(Not done yet)**
- GET `/api/movies/:id` Route for get Movie by Id **(Not done yet)**
- GET `/api/cinemas` Route for get all Cinemas **(Not done yet)**
- GET `/api/cinemas/:id` Route for get Cinemas by Id **(Not done yet)**

- GET `/api/admin/movies` Route for get all Movies **(Not done yet)**
- GET `/api/admin/genres` Route for get all Genre **(Not done yet)**
- GET `/api/admin/cinemas` Route for get all Cinema **(Not done yet)**
- GET `/api/admin/movies/:id` Route for get Movies by id **(Not done yet)**
- GET `/api/admin/genres/:id` Route for get Genre by id **(Not done yet)**
- GET `/api/admin/cinemas/:id` Route for get Cinema by id **(Not done yet)**
- POST/PUT `/api/admin/movies` Route for register new Movies **(Not done yet)**
- POST/PUT `/api/admin/genres` Route for register new Genre **(Not done yet)**
- POST/PUT `/api/admin/cinemas` Route for register new Cinema **(Not done yet)**
- PATCH/DELETE `/api/admin/movies/:id` Route for modify movie on database **(Not done yet)**
- PATCH/DELETE `/api/admin/genres/:id` Route for modify movie on database **(Not done yet)**
- PATCH/DELETE `/api/admin/cinemas/:id` Route for modify movie on database **(Not done yet)**
