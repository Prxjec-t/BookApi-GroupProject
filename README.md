# Book API

A group project developed by [Alexander Gerhard](https://github.com/alexgeho), [Amanda Andersson](https://github.com/amanda-andersson) and Kimi Leminaho as part of our Frontend Developer education at Medieinstitutet.

A web application where users can browse books, read and write reviews, and log in to access protected features.

## Features

- Browse books and view their details.
- Read and add book reviews.
- Register, log in and log out.
- Create, update and delete books through protected API endpoints.
- Manage users and reviews through protected API endpoints.

## Getting started

1. Clone the repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_own_secret_key
   ```

   Use your own MongoDB connection string and JWT secret. Do not commit the `.env` file.

4. Start the application:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## Database

The `database-export` folder contains JSON exports of the three MongoDB collections:

- `book-api.books.json`
- `book-api.reviews.json`
- `book-api.users.json`

Create a database named `book-api` in MongoDB and import each JSON file into its corresponding collection: `books`, `reviews` and `users`. Set `MONGODB_URL` to the connection string for your own database.

## Technologies

Node.js, Express, TypeScript, MongoDB, Mongoose, HTML, CSS and JavaScript.
