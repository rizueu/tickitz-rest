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
  npm start
  ```

# Flowchart

![alt text](https://github.com/rizueu/tickitz-rest/blob/main/tickitz-backend-flowchart.jpg?raw=true)

## API SPECS

- POST `/auth/register` Route for signup an account **(NEW)**
- POST `/auth/login` Route for sign into system **(NEW)**
- PATCH `/auth/forgot_password` Route for reset password **(NEW)**
- PATCH `/auth/activate` Route for activated new user account **(NEW)**
- PATCH `/auth/password/:id/:email` Route for edit user password **(NEW)**
- PATCH `/auth/user/:id` Route for edit user profile **(NEW)**
- GET `/auth/user/:id` Route for get all user by id **(NEW)**

- POST `/api/v1/moviegoers` Route for register become a member **(NEW)**

USER ROUTE

- GET `/api/v1/genre/:genre` Route for get Movie by its genre
- GET `/api/v1/movies` Route for get all Movie
- GET `/api/v1/movies/:id` Route for get Movie by Id
- GET `/api/v1/movies/month/:month` Route for get movie by month(releaseDate) **(NEW)**
- GET `/api/v1/cinemas` Route for get all Cinemas
- GET `/api/v1/cinemas/:id` Route for get Cinemas by Id
- GET `/api/v1/showtimes` Route for get schedule of showtimes **(NEW)**

ADMIN ROUTE

- GET `/api/v1/admin/movies` Route for get all Movies
- GET `/api/v1/admin/genres` Route for get all Genre
- GET `/api/v1/admin/cinemas` Route for get all Cinema
- GET `/api/v1/admin/movies/:id` Route for get Movies by id
- GET `/api/v1/admin/genres/:id` Route for get Genre by id
- GET `/api/v1/admin/cinemas/:id` Route for get Cinema by id
- GET `/api/v1/admin/times` Route for get all showtime from table times **(NEW)**
- POST/PUT `/api/v1/admin/movies` Route for register new Movies
- POST/PUT `/api/v1/admin/genres` Route for register new Genre
- POST/PUT `/api/v1/admin/cinemas` Route for register new Cinema
- POST/PUT `/api/v1/admin/times` Route for create new times **(NEW)**
- POST/PUT `/api/v1/admin/showtimes` Route for create new schedule of showtimes **(NEW)**
- PATCH/DELETE `/api/v1/admin/movies/:id` Route for modify movie on database
- PATCH/DELETE `/api/v1/admin/genres/:id` Route for modify movie on database
- PATCH/DELETE `/api/v1/admin/cinemas/:id` Route for modify movie on database
