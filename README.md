Full Stack JavaScript Project: Courses App

Acknowledgments

This project is part of the Treehouse Full Stack JavaScript program. It demonstrates how to build a full-stack application using React for the front-end and Express with SQLite for the back-end.

Overview

This project is a Full Stack JavaScript application that demonstrates the use of React, React Context, React Hooks, React Router, and Express with SQLite for creating, retrieving, updating, and deleting course data. It integrates both Client-Side Rendering (CSR) and Server-Side Rendering (SSR) to provide a seamless experience for authenticated users.


The project provides an interface for users to view a list of courses, create new courses, update existing courses, and delete courses. Authentication is handled using basic authentication, which allows users to sign up, sign in, and manage their courses securely.


Additionally, this project follows RESTful API principles for the back-end, allowing for clear and standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on the courses.

Features

React for building a dynamic front-end.
React Context API for state management (e.g., user authentication data).
React Router for navigation and routing between different parts of the application.
Express as the back-end server to handle API requests.
SQLite as the database for storing user data and courses.
Basic Authentication for secure user access and course management.
Postman for testing the API routes during development.
RESTful API design for creating a clean and efficient interface between the front-end and back-end.
CSR (Client-Side Rendering) and SSR (Server-Side Rendering) for creating a robust application that can handle dynamic user interactions and server-side data fetching.

Tech Stack

Front-End:
React (Functional components, Hooks, Context API)
React Router (Client-Side Routing)
CSS (for styling)

Back-End:
Express (API routes following RESTful principles)
SQLite (Database for storing user and course information)
Postman (API testing)
Authentication:
Basic authentication with Express for API protection.
API Design (RESTful):

The application follows RESTful API design principles, utilizing HTTP methods to handle CRUD (Create, Read, Update, Delete) operations. The API endpoints include:

POST /api/users: Create a new user (Sign Up)
POST /api/users/signin: Sign in an existing user
GET /api/courses: Retrieve all courses (Read)
POST /api/courses: Create a new course (Create)
PUT /api/courses/:id: Update a course by ID (Update)
DELETE /api/courses/:id: Delete a course by ID (Delete)

This RESTful design ensures the application is easy to understand and can communicate efficiently between the front-end and back-end.
