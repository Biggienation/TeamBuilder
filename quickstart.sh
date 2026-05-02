#!/bin/bash

# TeamBuilder Quick Start Script

echo "=================================================="
echo "TeamBuilder - Full Stack Setup"
echo "=================================================="
echo ""

# Check if Docker is running
echo "Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi
echo "✅ Docker is running"
echo ""

# Start MongoDB
echo "Starting MongoDB container..."
cd /Users/alex/IdeaProjects/TeamBuilder
docker-compose up -d
echo "✅ MongoDB started"
echo ""

# Build Frontend
echo "Building React frontend..."
cd /Users/alex/IdeaProjects/TeamBuilder/gui
npm install --legacy-peer-deps
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend built successfully"
echo ""

# Build and Run Backend
echo "Building Spring Boot backend..."
cd /Users/alex/IdeaProjects/TeamBuilder
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
echo "✅ Backend built successfully"
echo ""

echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "To start the backend, run:"
echo "  cd /Users/alex/IdeaProjects/TeamBuilder"
echo "  mvn spring-boot:run"
echo ""
echo "Or from IntelliJ IDEA:"
echo "  Run TeamBuilderApplication.java"
echo ""
echo "Access the application at: http://localhost:8080"
echo ""
echo "For development with frontend hot-reload:"
echo "  cd /Users/alex/IdeaProjects/TeamBuilder/gui"
echo "  npm start"
echo ""
echo "=================================================="

