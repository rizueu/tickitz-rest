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

- GET `/api/genre/:genre` Route for get Movie by its genre
- GET `/api/movies` Route for get all Movie
- GET `/api/movies/:id` Route for get Movie by Id
- GET `/api/cinemas` Route for get all Cinemas
- GET `/api/cinemas/:id` Route for get Cinemas by Id

- GET `/api/admin/movies` Route for get all Movies
- GET `/api/admin/genres` Route for get all Genre
- GET `/api/admin/cinemas` Route for get all Cinema
- GET `/api/admin/movies/:id` Route for get Movies by id
- GET `/api/admin/genres/:id` Route for get Genre by id
- GET `/api/admin/cinemas/:id` Route for get Cinema by id
- POST/PUT `/api/admin/movies` Route for register new Movies
- POST/PUT `/api/admin/genres` Route for register new Genre
- POST/PUT `/api/admin/cinemas` Route for register new Cinema
- PATCH/DELETE `/api/admin/movies/:id` Route for modify movie on database
- PATCH/DELETE `/api/admin/genres/:id` Route for modify movie on database
- PATCH/DELETE `/api/admin/cinemas/:id` Route for modify movie on database
