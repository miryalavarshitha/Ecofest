# How to Start the Backend - Correct Commands

## ✅ Correct Command (Windows PowerShell)

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**Important:** Make sure there's NO backslash at the end of the command!

## ✅ Alternative Methods

### Method 1: Using Maven Wrapper (Recommended)
```powershell
.\mvnw.cmd spring-boot:run
```

### Method 2: Using IDE
1. Open `RestaurantEcofestApplication.java` in your IDE
2. Right-click → Run

### Method 3: Build and Run JAR
```powershell
.\mvnw.cmd clean package
java -jar target/restaurant-ecofest-0.0.1-SNAPSHOT.jar
```

## ❌ Common Mistakes

**WRONG:** `.\mvnw.cmd spring-boot:run\` ❌ (backslash at end)
**RIGHT:** `.\mvnw.cmd spring-boot:run` ✅

**WRONG:** `mvnw spring-boot:run` ❌ (missing .cmd extension on Windows)
**RIGHT:** `.\mvnw.cmd spring-boot:run` ✅

## Before Running

1. **Make sure MySQL is running**
2. **Create the database:**
   ```sql
   CREATE DATABASE restaurant_ecofest;
   ```
3. **Update credentials in** `src/main/resources/application.properties`

## Expected Output

When successful, you should see:
```
Started RestaurantEcofestApplication in X.XXX seconds
```

The backend will be available at: `http://localhost:8080`

## About the Warnings

The warnings about `sun.misc.Unsafe` are from Maven itself, not your code. They are harmless and can be ignored.

