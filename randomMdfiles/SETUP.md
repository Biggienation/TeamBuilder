# TeamBuilder - React + Spring Boot + MongoDB

A full-stack web application for managing teams and fullCharacterModels with a React frontend and Spring Boot backend.

## Project Structure

```
TeamBuilder/
├── gui/                      # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── views/            # Page components
│   │   ├── services/         # API client services
│   │   ├── reducers/         # State management
│   │   └── App.tsx           # Main app component
│   ├── package.json
│   └── build/                # Built frontend (created by npm run build)
│
├── app/                      # Spring Boot backend
│   ├── src/main/java/teambuilder/
│   │   ├── controller/       # REST API controllers
│   │   ├── service/          # Business logic
│   │   ├── repository/       # Database access
│   │   ├── model/            # Data models
│   │   ├── config/           # Configuration classes
│   │   └── TeamBuilderApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── docker-compose.yml        # MongoDB container configuration
└── pom.xml                   # Root project pom with build configuration
```

## Prerequisites

- Java 17+
- Node.js v22+
- npm 9+
- Docker & Docker Compose (for MongoDB)
- Maven 3.6+

## Setup Instructions

### 1. Start MongoDB

```bash
cd /Users/alex/IdeaProjects/TeamBuilder
docker-compose up -d
```

This will start a MongoDB container on port 27017 with the database `teambuilder`.

### 2. Build the Frontend

```bash
cd /Users/alex/IdeaProjects/TeamBuilder/gui
npm install --legacy-peer-deps
npm run build
```

The built files will be placed in `/gui/build` and automatically included in the Spring Boot application.

### 3. Build and Run the Backend

```bash
cd /Users/alex/IdeaProjects/TeamBuilder
mvn clean package
mvn spring-boot:run
```

Or run from your IDE:
- Open the project in IntelliJ IDEA
- Find `TeamBuilderApplication.java` and run it

The backend will be available at: **http://localhost:8080**

### 4. Access the Application

- **Frontend**: http://localhost:8080 (served by Spring Boot)
- **API Base URL**: http://localhost:8080/api
- **Characters API**: http://localhost:8080/api/fullCharacterModels

## Development

### Frontend Development

For live reloading during development:

```bash
cd gui
npm start
```

This will run the React dev server on `http://localhost:3000` and proxy API requests to `http://localhost:8080`.

### Backend Development

The backend automatically reloads changes due to Spring DevTools when running in development mode.

## API Endpoints

### Characters

- `GET /api/fullCharacterModels` - Get all fullCharacterModels
- `GET /api/fullCharacterModels/{id}` - Get fullCharacterModel by ID
- `POST /api/fullCharacterModels` - Create a new fullCharacterModel
- `PUT /api/fullCharacterModels/{id}` - Update a fullCharacterModel
- `DELETE /api/fullCharacterModels/{id}` - Delete a fullCharacterModel
- `GET /api/fullCharacterModels/tier/{tier}` - Get fullCharacterModels by tier
- `GET /api/fullCharacterModels/role/{role}` - Get fullCharacterModels by role
- `GET /api/fullCharacterModels/search/{name}` - Search fullCharacterModels by name

### Example Request

```bash
curl -X GET http://localhost:8080/api/fullCharacterModels
```

### Example POST Request

```bash
curl -X POST http://localhost:8080/api/fullCharacterModels \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hero 1",
    "tier": "S",
    "level": 10,
    "role": "Warrior",
    "description": "A powerful hero"
  }'
```

## Environment Configuration

### Spring Boot (app/src/main/resources/application.properties)

- `server.port` - Backend server port (default: 8080)
- `spring.data.mongodb.uri` - MongoDB connection string

### React (gui/.env)

Create a `.env` file in the `gui` directory to configure the API URL:

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Database Schema (MongoDB)

### Characters Collection

```json
{
  "id": "string",
  "name": "string",
  "tier": "string",
  "level": "number",
  "role": "string",
  "imageUrl": "string",
  "description": "string"
}
```

## Deployment

### Production Build

1. Build the frontend:
```bash
cd gui
npm run build
```

2. Build the backend:
```bash
mvn clean package -DskipTests
```

3. Run the Spring Boot application:
```bash
java -jar app/target/TeamBuilder-1.0.0.jar
```

The application will serve both the API and the frontend on port 8080.

## Technology Stack

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- React Virtuoso (for efficient list rendering)

### Backend
- Spring Boot 3.2
- Spring Data MongoDB
- Spring Web
- Lombok
- Maven

### Database
- MongoDB

## Common Issues

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
docker-compose ps
```

### npm Peer Dependency Conflicts
Install with legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```

### Port Already in Use
- Backend (8080): Change `server.port` in `application.properties`
- Frontend dev (3000): Specify a different port: `PORT=3001 npm start`

## Additional Notes

- The built frontend is stored in `/gui/build` and served as static content by the Spring Boot application
- CORS is enabled on the backend to allow cross-origin requests
- All API responses use JSON format
- Error handling is implemented on both frontend and backend

## Contributing

When adding new features:
1. Create the backend service/controller/repository
2. Build and test the backend
3. Create the frontend components/services
4. Test integration with the API
5. Run `npm run build` before committing
