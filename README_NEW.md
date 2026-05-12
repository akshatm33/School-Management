# School Management API

A simple REST API built using Node.js, Express.js, and MySQL for managing school data.
This project allows users to add schools and fetch schools sorted according to their distance from a user’s location.

---

## Tech Stack

* Node.js
* Express
* MySQL
* Postman

---

## Features

* Add new schools to the database
* Fetch schools sorted by proximity
* Distance calculation using Haversine Formula
* Input validation
* Error handling
* Clean folder structure using MVC pattern

---

## Project Structure

```bash
school-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── schoolController.js
│
├── routes/
│   └── schoolRoutes.js
│
├── utils/
│   └── distanceCalculator.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project folder:

```bash
cd school-management-api
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root folder and add the following:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
```

---

## Database Setup

Create database:

```sql
CREATE DATABASE school_management;
```

Use database:

```sql
USE school_management;
```

Create schools table:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## Running the Project

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

Server runs on:

```bash
http://localhost:5000
```

---

# API Endpoints

---

## 1. Add School

### Endpoint

```http
POST /addSchool
```

### Request Body

```json
{
  "name": "Delhi Public School",
  "address": "New Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

### Success Response

```json
{
  "success": true,
  "message": "School added successfully"
}
```

---

## 2. List Schools

### Endpoint

```http
GET /listSchools?latitude=28.7041&longitude=77.1025
```

### Success Response

```json
{
  "success": true,
  "schools": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "New Delhi",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "distance": "0.00 km"
    }
  ]
}
```

---

## Distance Calculation

The project uses the Haversine Formula to calculate the geographical distance between the user’s coordinates and school coordinates.

---

## Testing

API testing can be done using:

* Postman
* Thunder Client
* Insomnia

---

## Deployment

The API can be deployed on platforms like:

* [Render](https://render.com?utm_source=chatgpt.com)
* [Railway](https://railway.app?utm_source=chatgpt.com)

---

## Future Improvements

* Authentication & Authorization
* Pagination
* Swagger Documentation
* Search Filters
* Docker Support

---

## Author

Akshat Maheshwari

---
