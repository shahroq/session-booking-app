# Session App

A session management application that allows users to register as either a therapist or a client. Therapists can manage sessions by deleting available sessions, canceling booked sessions, and marking sessions as completed. Clients can view, book, and cancel their sessions.

## Table of Contents

- [Session App](#session-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation and Setup](#installation-and-setup)
  - [Access the app](#access-the-app)
  - [Assumptions and Development Decisions](#assumptions-and-development-decisions)

## Overview

This project is built using Vite, React, Tailwind CSS, Axios, and React Router. It supports user authentication, role-based dashboards, responsive design, and session management. Therapists have access to a dashboard that allows them to delete available sessions, cancel booked sessions, and mark sessions as completed, while clients can view their sessions and book new ones.

## Features

- **User Authentication:**

  - Registration with role selection (therapist or client)
  - Login with error handling and notifications

- **Role-Based Dashboards:**

  - Therapists: View, delete, cancel, and mark sessions as completed
  - Clients: View and book sessions

- **Session Management:**

  - Sessions have statuses such as `available`, `scheduled`, and `completed`.
  - Therapists can delete sessions that are available (i.e., unbooked).

- **Responsive UI:**

  - Tailwind CSS is used for styling.
  - A responsive Navbar with a mobile hamburger menu is included.

- **Real-Time Notifications:**
  - Notifications are shown upon successful deletion, cancellation, or completion of sessions.

## Technologies Used

- **Backend:**

  - **[Express.js](https://expressjs.com/):** For building the API.
  - **[SQLite](https://www.sqlite.org/index.html):** Relational database.
  - **[Sequelize](https://sequelize.org/):** ORM for managing SQL databases.
  - **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken):** For handling JWT authentication.
  - **[express-validator](https://express-validator.github.io/):** For validating incoming requests.

- **Frontend:**
  - **[Vite](https://vitejs.dev/):** For fast build and development.
  - **[React](https://reactjs.org/):** UI library (using the latest available version).
  - **[React Router DOM](https://reactrouter.com/):** For client-side routing.
  - **[Axios](https://axios-http.com/):** For making HTTP requests to the backend API.
  - **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework.

## Installation and Setup

```bash
# Clone the Repository
git clone https://github.com/shahroq/session-app.git
cd session-app

# Install dependencies
npm i

# go to api directori, and install backend dependencies
cd api
npm i

# Copy the sample.env file to create a .env file, and tweak the values if needed
cp sample.env .env

# Migrate & Seed the database
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Run the backend server
cd api
npm start

# go to root in a separate terminal, & run the frontend app
cd .. # if not in the root
npm run dev
```

## Access the app

- Open your browser and navigate to http://localhost:5173.
- Use the registration page to sign up as either a therapist or a client, or use seeded users to sign in
  - sample `therapis` user: trent@example.com/12345
  - sample `client` user: david@example.com/12345

## Assumptions and Development Decisions

- **Backend Endpoints:**

  - The frontend assumes the existence of the following endpoints. Endpoints are kept minimal, and they designed to act accordingly based on the users' role with different outcome.

    - `PUT /auth/signup` for user registration
    - `POST /auth/signin` for user login

    - `GET /session` to (R)ead all sessions
    - `POST /session` to (C)reate a new session
    - `GET /session/:id` to (R)ead a new session
    - `PUT /session/:id` to (U)pdate an session
    - `DELETE /session/:id` to (D)elete a session

- **User Roles and Route Protection:**

  - Users are differentiated by their roles ("therapist" or "client") during registration and login.
  - Role-based route protection is implemented using React Router and a custom `ProtectedRoute` component.

- **Error Handling:**

  - Error messages from the backend are assumed to be returned in `error.response.data.message` and are displayed in the UI accordingly.

- **Session Status:**

  - Sessions have 3 statuses, which are `available`, `scheduled`, and `completed`.
  - Therapists can delete sessions only when they are available.

- **State Management:**

  - React Context is used for authentication state management, with user sessions persisted via `localStorage`.
  - Session data is kept in local component state (for example, within the TherapistDashboard) and is passed down to child components via props (prop drilling).

- **Form Handling:**
  - Simple HTML form handling with `FormData` is used to manage form submissions.
