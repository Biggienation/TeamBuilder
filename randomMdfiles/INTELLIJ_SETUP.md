# IntelliJ IDEA Configuration

## Opening the Project

1. **Open the Project**
   - File → Open
   - Select `/Users/alex/IdeaProjects/TeamBuilder`
   - Click Open

2. **Mark as Maven Project** (if not auto-detected)
   - Right-click `pom.xml` → Add as Maven Project

3. **Mark Frontend as Resources**
   - Right-click `gui` → Mark Directory as → Resources Root

## Running the Backend

### Option 1: From IDE
1. Open `app/src/main/java/teambuilder/TeamBuilderApplication.java`
2. Click the ▶️ (Run) button next to the class declaration
3. Backend starts on http://localhost:8080

### Option 2: Maven
```bash
# In Terminal (Ctrl+Alt+T or View → Tool Windows → Terminal)
mvn spring-boot:run
```

## Running the Frontend

### Development Mode
```bash
# Terminal
cd gui
npm start
```
- Frontend on http://localhost:3000
- Backend API is proxied to http://localhost:8080

### Build for Production
```bash
# Terminal
cd gui
npm run build
```

## Setting Up Run Configurations

### Configuration 1: Backend
1. Run → Edit Configurations
2. Click `+` → Maven
3. Name: "Backend"
4. Working directory: `/Users/alex/IdeaProjects/TeamBuilder`
5. Command line: `spring-boot:run`
6. Save and run with ▶️

### Configuration 2: Frontend Dev Server
1. Run → Edit Configurations
2. Click `+` → npm
3. Name: "Frontend Dev"
4. Working directory: `/Users/alex/IdeaProjects/TeamBuilder/gui`
5. Scripts: `start`
6. Save and run with ▶️

## Debugging

### Backend Debugging
1. Set a breakpoint in Java code
2. Run → Debug (Shift+F9) instead of Run
3. Application will pause at breakpoints

### Frontend Debugging
1. Visit http://localhost:3000 in browser
2. Right-click → Inspect or Press F12
3. Use browser DevTools

## Build Artifacts

### Frontend Build Output
- **Location**: `gui/build/`
- **Auto-included**: Yes, in Spring Boot build
- **Served from**: Spring Boot at `/`

### Backend Build Output
- **Location**: `app/target/TeamBuilder-1.0.0.jar`
- **Includes**: Frontend build + Backend
- **Run**: `java -jar app/target/TeamBuilder-1.0.0.jar`

## Common Tasks

### Install Dependencies
```bash
# Backend (automatic with Maven)
mvn dependency:resolve

# Frontend
cd gui
npm install --legacy-peer-deps
```

### Clean Build
```bash
# Backend
mvn clean
mvn clean package

# Frontend
cd gui
rm -rf node_modules build
npm install --legacy-peer-deps
npm run build
```

### Run Full Build
```bash
# From root directory
cd gui && npm install --legacy-peer-deps && npm run build && cd ..
mvn clean package
```

### Run Test
```bash
# Backend
mvn test

# Frontend
cd gui && npm test
```

## Database Connection

### MongoDB in Docker
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f mongo

# Access MongoDB shell
docker exec -it teamBuilder mongosh
```

## Code Format

### Java Code Format
1. Select code → Code → Reformat Code (Cmd+Opt+L)

### TypeScript Code Format
1. Select code → Code → Reformat Code (Cmd+Opt+L)
2. Or use Prettier: `npx prettier --write <file>`

## File Watchers

### Automatic Compilation
1. Preferences → Tools → File Watchers
2. Should auto-detect TypeScript

## Terminal Integration

Access terminal from IDE:
- View → Tool Windows → Terminal (Alt+F12)

Common commands ready to paste:
```bash
# Start MongoDB
docker-compose up -d

# Build Frontend
cd gui && npm run build

# Install Frontend Dependencies
npm install --legacy-peer-deps

# Clean Build
mvn clean package

# Run Tests
mvn test
```

## Shortcuts

| Action | Shortcut |
|--------|----------|
| Run | Ctrl+F5 or ▶️ |
| Debug | Shift+F9 |
| Stop | Ctrl+F2 |
| Reformat | Cmd+Opt+L |
| Find in Files | Cmd+Shift+F |
| Search Everywhere | Cmd+Shift+A |
| Terminal | Alt+F12 |
| Commit | Cmd+K |

---

Everything is configured and ready to go! 🚀

