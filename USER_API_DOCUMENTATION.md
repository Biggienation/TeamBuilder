# User REST API Implementation Guide

## Overview
This document outlines the complete User REST API implementation for the TeamBuilder application, designed to handle user registration, authentication, and profile management for future account login functionality.

## Architecture Overview

The implementation follows a layered architecture pattern:

```
Controller (REST Endpoints)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database (MongoDB)
```

---

## Components Created

### 1. **User Model** (`User.java`)
The core entity representing a user in the system.

**Location:** `app/src/main/java/teambuilder/model/User.java`

**Fields:**
- `id`: MongoDB document ID (auto-generated)
- `username`: Unique username for login
- `email`: Unique email address
- `password`: Hashed password (BCrypt)
- `firstName`: User's first name
- `lastName`: User's last name
- `createdAt`: Account creation timestamp
- `updatedAt`: Last profile update timestamp
- `active`: Account status flag

**Annotations:**
- `@Document(collection = "users")`: Marks this as a MongoDB document in the "users" collection
- `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`: Lombok annotations for getters/setters and constructors

---

### 2. **User Repository** (`UserRepository.java`)
Handles all database operations for users.

**Location:** `app/src/main/java/teambuilder/repository/UserRepository.java`

**Methods:**
- `findByUsername(String username)`: Find user by username
- `findByEmail(String email)`: Find user by email
- `existsByUsername(String username)`: Check if username exists
- `existsByEmail(String email)`: Check if email exists
- Standard CRUD operations inherited from `MongoRepository`

**Purpose:** Provides a clean abstraction layer for data access without writing raw database queries.

---

### 3. **DTOs (Data Transfer Objects)**

#### 3a. **UserRegistrationRequest** (`UserRegistrationRequest.java`)
Used for registration and profile update requests.

```java
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### 3b. **UserLoginRequest** (`UserLoginRequest.java`)
Used for login requests.

```java
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

#### 3c. **UserResponse** (`UserResponse.java`)
Returned by all endpoints (never exposes passwords).

```java
{
  "id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "active": true
}
```

---

### 4. **User Service** (`UserService.java`)
Contains all business logic for user operations.

**Location:** `app/src/main/java/teambuilder/service/UserService.java`

**Key Methods:**

#### `registerUser(UserRegistrationRequest request)`
- Validates username and email uniqueness
- Encodes password using BCrypt
- Sets creation timestamp
- Returns UserResponse with created user

#### `authenticateUser(String username, String password)`
- Finds user by username
- Verifies password matches hash
- Checks if account is active
- Returns UserResponse on success

#### `getUserById(String id)`
- Retrieves user by MongoDB ID
- Throws exception if not found

#### `getUserByUsername(String username)`
- Retrieves user by username
- Useful for profile lookups

#### `updateUser(String id, UserRegistrationRequest request)`
- Updates user's firstName, lastName, and email
- Validates new email isn't already taken
- Updates the updatedAt timestamp

#### `deleteUser(String id)`
- Removes user from database
- Throws exception if user doesn't exist

#### `getAllUsers()`
- Returns all users in the system
- Never returns passwords

---

### 5. **User Controller** (`UserController.java`)
REST endpoints for client interaction.

**Location:** `app/src/main/java/teambuilder/controller/UserController.java`

**Base URL:** `/api/users`

#### Endpoints:

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| POST | `/register` | Register new user | No |
| POST | `/login` | Authenticate user | No |
| GET | `/{id}` | Get user by ID | No* |
| GET | `/username/{username}` | Get user by username | No* |
| GET | `/` | List all users | No* |
| PUT | `/{id}` | Update user profile | No* |
| DELETE | `/{id}` | Delete user account | No* |

*Currently allows public access (will be restricted with JWT tokens later)

#### Response Format:
All endpoints return JSON with appropriate HTTP status codes:

```json
{
  "message": "Success message",
  "user": { /* UserResponse */ },
  "error": "Error message if applicable"
}
```

**Status Codes:**
- `200 OK`: Successful GET, PUT, DELETE
- `201 Created`: Successful POST registration
- `400 Bad Request`: Invalid input or validation errors
- `401 Unauthorized`: Authentication failed
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

### 6. **Security Configuration** (`SecurityConfig.java`)
Configures Spring Security for the application.

**Location:** `app/src/main/java/teambuilder/config/SecurityConfig.java`

**Features:**
- **PasswordEncoder Bean**: Provides BCryptPasswordEncoder for secure password hashing
- **CORS Support**: Allows requests from any origin (configured via `@CrossOrigin` in controller)
- **CSRF Disabled**: Disabled for API endpoints (acceptable for stateless APIs)
- **Permissive Access**: All API endpoints are publicly accessible

**Future Enhancement:**
Replace with JWT token-based authentication for secure, stateless authentication.

---

## MongoDB Integration

### Database Configuration
Already configured in `application.properties`:
```properties
spring.data.mongodb.uri=mongodb://teamBuilderUser:teamBuilderPassword@localhost:27017/teamBuilderDB?authSource=admin
```

### User Collection
MongoDB will automatically create the "users" collection on first insert with the following structure:

```json
{
  "_id": ObjectId("..."),
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2a$10$...", // BCrypt hash
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": ISODate("2026-05-03T..."),
  "updatedAt": ISODate("2026-05-03T..."),
  "active": true
}
```

---

## API Usage Examples

### 1. Register a New User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "alice",
  "email": "alice@example.com",
  "password": "SecurePass123!",
  "firstName": "Alice",
  "lastName": "Smith"
}

Response (201 Created):
{
  "id": "507f1f77bcf86cd799439012",
  "username": "alice",
  "email": "alice@example.com",
  "firstName": "Alice",
  "lastName": "Smith",
  "active": true
}
```

### 2. Login User
```bash
POST /api/users/login
Content-Type: application/json

{
  "username": "alice",
  "password": "SecurePass123!"
}

Response (200 OK):
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "username": "alice",
    "email": "alice@example.com",
    "firstName": "Alice",
    "lastName": "Smith",
    "active": true
  }
}
```

### 3. Get User Profile
```bash
GET /api/users/507f1f77bcf86cd799439012

Response (200 OK):
{
  "id": "507f1f77bcf86cd799439012",
  "username": "alice",
  "email": "alice@example.com",
  "firstName": "Alice",
  "lastName": "Smith",
  "active": true
}
```

### 4. Update User Profile
```bash
PUT /api/users/507f1f77bcf86cd799439012
Content-Type: application/json

{
  "username": "alice",
  "email": "alice.new@example.com",
  "password": "ignored",
  "firstName": "Alicia",
  "lastName": "Smith"
}

Response (200 OK):
{
  "id": "507f1f77bcf86cd799439012",
  "username": "alice",
  "email": "alice.new@example.com",
  "firstName": "Alicia",
  "lastName": "Smith",
  "active": true
}
```

### 5. Delete User Account
```bash
DELETE /api/users/507f1f77bcf86cd799439012

Response (200 OK):
{
  "message": "User deleted successfully"
}
```

---

## Security Features Implemented

### Password Security
- **BCrypt Hashing**: Passwords are hashed with BCrypt, never stored in plain text
- **Salt**: Each password hash includes a unique salt
- **One-way**: Passwords cannot be reversed or decrypted

### Data Validation
- **Username Uniqueness**: No duplicate usernames
- **Email Uniqueness**: No duplicate emails
- **Active Status**: Prevents login for deactivated accounts

### API Security (Future Enhancements)
- [ ] JWT Token-based Authentication
- [ ] Role-based Access Control (RBAC)
- [ ] Rate Limiting
- [ ] Input Validation & Sanitization
- [ ] HTTPS/TLS Encryption
- [ ] Audit Logging

---

## Dependencies Added

### Spring Security
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Provides:
- BCryptPasswordEncoder for secure password hashing
- Security configuration support
- CSRF protection

---

## File Structure

```
app/src/main/java/teambuilder/
├── model/
│   ├── Character.java
│   └── User.java (NEW)
├── repository/
│   ├── CharacterRepository.java
│   └── UserRepository.java (NEW)
├── service/
│   ├── CharacterService.java
│   └── UserService.java (NEW)
├── controller/
│   ├── CharacterController.java
│   └── UserController.java (NEW)
├── dto/
│   ├── UserRegistrationRequest.java (NEW)
│   ├── UserLoginRequest.java (NEW)
│   └── UserResponse.java (NEW)
└── config/
    ├── appConfig.java
    ├── DataInitializer.java
    └── SecurityConfig.java (NEW)
```

---

## Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"Test123!"}'
```

### Using Postman
1. Create a new collection "TeamBuilder API"
2. Add POST request to `http://localhost:8080/api/users/register`
3. Set Body as JSON with registration data
4. Send and verify response

---

## Next Steps

1. **JWT Authentication**: Implement JWT tokens for secure, stateless authentication
2. **Email Verification**: Add email confirmation for new registrations
3. **Password Reset**: Implement secure password reset flow
4. **OAuth Integration**: Add Google/GitHub login options
5. **User Roles**: Implement role-based access control (Admin, User, etc.)
6. **Audit Logging**: Track user actions and account changes
7. **Frontend Integration**: Connect React frontend to login/registration endpoints

---

## Summary

This User REST API implementation provides:
- ✅ User registration with password encryption
- ✅ User login with password verification
- ✅ User profile management (create, read, update, delete)
- ✅ MongoDB persistence
- ✅ RESTful endpoint design
- ✅ Security best practices (BCrypt hashing, validation)
- ✅ Proper error handling and HTTP status codes

The foundation is now in place for building a complete authentication system with JWT tokens and role-based access control.
