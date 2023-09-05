# Vaccine Registration API

This repository contains the backend API for a vaccine registration system, implemented using Node.js and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
  - [User Endpoints](#user-endpoints)
  - [Admin Endpoints](#admin-endpoints)
- [Authentication](#authentication)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API provides functionality for a vaccine registration system, including user registration and login, slot availability, slot registration, slot updates, and admin management.

## Endpoints

### User Endpoints

#### User Registration

- **POST /api/users/register**
  - Register a new user with mandatory fields (Name, PhoneNumber, Age, Pincode, Aadhar No).
  - Example request body:
    ```json
    {
      "name": "John Doe",
      "phoneNumber": "1234567890",
      "age": 30,
      "pincode": "12345",
      "aadharNo": 123456789012,
      "password": "your_password",
    }
    ```

#### User Login

- **POST /api/users/login**
  - Authenticate a user with PhoneNumber and password.
  - Example request body:
    ```json
    {
      "phoneNumber": "1234567890",
      "password": "your_password"
    }
    ```

#### Available Slots

- **GET /api/users/slot/available**
  - Retrieve available time slots for vaccine registration based on user's vaccination status (first dose, second dose).

#### Register Vaccine Slot

- **POST /api/users/slot/register**
  - Register a user for a vaccine slot.
  - Example request body:
    ```json
    {
      "userId": "user_id",
      "date": "2023-09-01",
      "timeSlot": "11:00 AM",
      "doseType": "first-dose"
    }
    ```

#### Update Vaccine Slot

- **PUT /api/users/slot/update-slot**
  - Update a user's registered vaccine slot until 24 hours prior to the slot time.
  - Example request body:
    ```json
    {
      "userId": "user_id",
      "slotId": "slot_id",
      "newTimeSlot": "2:00 PM"
    }
    ```
## Authentication

    - User endpoints require authentication via JSON Web Tokens (JWT). After successfully logging in, you will receive a JWT token.

  - To authenticate subsequent requests, include the JWT token in the `Authorization` header using the "Bearer Token" format.

    Example Header:
    ```
    Authorization: Bearer <your-jwt-token>
    ```

    You can obtain the JWT token by sending a POST request to `/api/users/login` with your login credentials.

- Admin endpoints require admin credentials.

### Admin Endpoints

#### Admin Login

- **POST /api/admin/login**
  - Authenticate as an admin.

#### Total Users

- **GET /api/admin/total-users**
  - Retrieve total user registrations and filter by Age, Pincode, and Vaccination Status.

#### Total Slots

- **GET /api/admin/total-slots**
  - Retrieve total vaccine slots registrations.

## Authentication

- Admin endpoints require authentication via JSON Web Tokens (JWT). After successfully logging in, you will receive a JWT token.

  - To authenticate subsequent requests, include the JWT token in the `Authorization` header using the "Bearer Token" format.

    Example Header:
    ```
    Authorization: Bearer <your-jwt-token>
    ```

    You can obtain the JWT token by sending a POST request to `/api/admin/login` with your login credentials.

## Usage

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables (MongoDB URI, JWT secret, etc.).
    - MONGODB_URI ="mongodb+srv://nazimameerpp:NAZIM123@cluster0.ipzufpm.mongodb.net/vaccineDB?retryWrites=true&w=majority"
    - JWT_SECRET="runo"
    - PORT=8000
5. Start the server: `npm start`

## License

This project is licensed under the [MIT License](LICENSE).

