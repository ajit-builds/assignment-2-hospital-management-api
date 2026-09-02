# 🏥 Hospital Management API

A RESTful API for managing hospital information and user authentication built with **Express.js**, **MongoDB**, and **Passport.js**.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Running the Server](#-running-the-server)
- [Authentication Flow](#-authentication-flow)
- [Error Handling](#-error-handling)
- [Future Enhancements](#-future-enhancements)

---

## 🎯 Project Overview

This is **Assignment 2** - a Hospital Management API that demonstrates:
- **User Authentication**: Register and login functionality with secure password hashing using `bcryptjs`
- **Passport.js Integration**: Local strategy implementation for user authentication
- **Hospital Data Management**: Retrieve hospital information including bed availability
- **RESTful API Design**: Clean and organized route structure

### Key Features:
- ✅ User Registration with email and username uniqueness validation
- ✅ User Login with secure password verification
- ✅ Hospital listing and management
- ✅ Password encryption using bcryptjs
- ✅ Error handling and validation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Express.js 5.x** | Web framework for Node.js |
| **MongoDB** | NoSQL database for storing users and hospitals |
| **Mongoose 9.x** | MongoDB object modeling and validation |
| **Passport.js** | Authentication middleware with Local strategy |
| **bcryptjs 3.x** | Password hashing and verification |
| **Node.js** | JavaScript runtime |

---

## 📁 Project Structure

```
Assignment 2/Ajit Singh/
├── server.js                 # Main entry point - Express app initialization
├── package.json              # Project dependencies and metadata
├── .gitignore               # Git ignore rules
├── config/
│   └── db.js                # MongoDB connection configuration
├── models/
│   ├── Hospitals.js         # Hospital schema and model
│   └── User.js              # User schema and model
└── router/
    └── hospitalRouter.js    # API routes - auth and hospital endpoints
```

### File Descriptions:

**server.js** - Main application file
- Initializes Express app
- Sets up middleware (express.json, passport)
- Mounts routes under `/hospital` prefix
- Starts server on port 4000

**config/db.js** - Database configuration
- Connects to MongoDB
- Handles connection errors and events

**models/User.js** - User Schema
- `name`: String (required) - User's full name
- `username`: String (required, unique) - Username for login
- `email`: String (required, unique) - Email address
- `password`: String (required) - Hashed password

**models/Hospitals.js** - Hospital Schema
- `name`: String (required) - Hospital name
- `city`: String (required) - Location city
- `totalBeds`: String (required) - Total bed capacity
- `availableBeds`: String (required) - Currently available beds

**router/hospitalRouter.js** - Routes
- User registration and login endpoints
- Hospital data retrieval endpoints
- Passport Local strategy configuration

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Running locally or access to a MongoDB Atlas URI
- **Postman** (optional, for API testing)

Verify installation:
```bash
node --version
npm --version
```

---

## 🚀 Installation & Setup

### Step 1: Clone/Navigate to Project
```bash
cd "Assignment 2/Ajit Singh"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `passport` & `passport-local` - Authentication
- `bcryptjs` - Password hashing
- `router` - Additional routing utilities

### Step 3: Database Setup
Ensure MongoDB is running on your system:

**Option A: Local MongoDB (if installed)**
```bash
# Start MongoDB service (macOS with Homebrew)
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection URI
- Update the URI in `config/db.js`

---

## ⚙️ Configuration

### Database Configuration (config/db.js)

The database configuration file connects to MongoDB. Update the connection string as needed:

```javascript
// Local MongoDB
mongodb://localhost:27017/hospital_db

// MongoDB Atlas (cloud)
mongodb+srv://username:password@cluster.mongodb.net/hospital_db
```

Ensure the MongoDB service is running before starting the server.

---

## 🔌 API Endpoints

### Base URL: `http://localhost:4000/hospital`

### 1. **Health Check**
```http
GET /hospital/
```
**Response:**
```json
{
  "message": "Welcome to the hospital API"
}
```

---

### 2. **User Registration**
```http
POST /hospital/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Name, username, email and password are required"
}
```

**Error Response (409 - Conflict):**
```json
{
  "message": "Username or email already exists"
}
```

---

### 3. **User Login**
```http
POST /hospital/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid username or password"
}
```

---

### 4. **Get All Hospitals**
```http
GET /hospital/hospitals
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "City Medical Center",
    "city": "New York",
    "totalBeds": "500",
    "availableBeds": "120"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Health Plus Hospital",
    "city": "Los Angeles",
    "totalBeds": "350",
    "availableBeds": "85"
  }
]
```

---

## ▶️ Running the Server

### Start the Server
```bash
npm start
# or
node server.js
```

**Expected Output:**
```
Server is running on port 4000
```

The API will be available at: `http://localhost:4000/hospital`

### Stop the Server
Press `Ctrl + C` in the terminal

---

## 🔐 Authentication Flow

### How Password Security Works:

1. **Registration:**
   - User submits password in plain text
   - Password is hashed using `bcrypt` with 10 salt rounds
   - Hashed password is stored in MongoDB (original password is never saved)

2. **Login:**
   - User submits username and password
   - Passport.js finds user by username
   - `bcrypt.compare()` verifies if provided password matches stored hash
   - If match: User authenticated, session data returned
   - If no match: Authentication fails with 401 error

### Key Security Features:
- ✅ Passwords are hashed, not stored in plain text
- ✅ Username and email uniqueness prevents duplicate accounts
- ✅ Passport.js handles secure authentication
- ✅ Error messages don't reveal if username exists

---

## ⚠️ Error Handling

### Common Status Codes:

| Status | Meaning | Example |
|--------|---------|---------|
| **200** | Success | Login successful |
| **201** | Created | User registered |
| **400** | Bad Request | Missing required fields |
| **401** | Unauthorized | Invalid credentials |
| **409** | Conflict | Username/email already exists |
| **500** | Server Error | Database connection failed |

### Debugging Tips:
1. Check MongoDB is running
2. Verify connection string in `config/db.js`
3. Check browser console for error messages
4. Use Postman to test endpoints individually
5. Add `console.log()` statements in routes for debugging

---

## 🔄 Testing with Postman

### Import Steps:
1. Open Postman
2. Create a new collection "Hospital API"
3. Add the following requests:

**Test Flow:**
1. Register a user (POST /register)
2. Login with credentials (POST /login)
3. Get all hospitals (GET /hospitals)

### Example Test Workflow:
```
1. POST /register → Stores user credentials
2. POST /login → Validates credentials and returns user data
3. GET /hospitals → Retrieves all hospitals
```

---

## 🚀 Future Enhancements

Potential features to add:

- [ ] **JWT Tokens**: Replace session-based auth with JWT for stateless authentication
- [ ] **Hospital CRUD**: Add POST, PUT, DELETE endpoints for hospital management
- [ ] **Bed Booking**: Implement bed reservation system
- [ ] **Doctor Management**: Add doctor profiles and schedules
- [ ] **Appointment System**: Book doctor appointments
- [ ] **Admin Dashboard**: Role-based access control
- [ ] **Email Verification**: Confirm email during registration
- [ ] **Password Reset**: Forgot password functionality
- [ ] **Database Validation**: Add more strict data validation
- [ ] **API Documentation**: Swagger/OpenAPI specification
- [ ] **Unit Tests**: Jest/Mocha test suite
- [ ] **Logging**: Morgan logger for HTTP requests
- [ ] **Rate Limiting**: Prevent brute force attacks
- [ ] **CORS**: Enable cross-origin requests

---

## 📝 Assignment Details

**Assignment:** 2 - Hospital Management API  
**Tech Stack:** Express.js, MongoDB, Mongoose, Passport.js, bcryptjs  
**Objective:** Create a secure hospital management system with user authentication and hospital data management.

---

## 🤝 Support & Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check connection string in `config/db.js`
- Verify MongoDB service status

### Issue: "Port 4000 already in use"
**Solution:**
```bash
# Kill process on port 4000 (macOS/Linux)
lsof -ti:4000 | xargs kill -9
```

### Issue: "Username already exists"
**Solution:**
- Use a unique username during registration
- Check MongoDB to see existing users

### Issue: "Login fails with correct credentials"
**Solution:**
- Ensure password was hashed during registration
- Check user document in MongoDB for correct username

---

## 📄 License

ISC License - This project is created for academic purposes.

---

## 👨‍💻 Author

**Ajit Singh**  
Assignment 2 - Hospital Management API

---

**Last Updated:** 2026-09-02  
**Version:** 1.0.0

