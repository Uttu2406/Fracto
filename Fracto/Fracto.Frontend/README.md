# Fracto — Online Doctor Appointment Booking Platform

Fracto is a full-stack web application that allows users to search for doctors, book appointments, and manage their healthcare needs online.

## Tech Stack

- **Frontend:** Angular 21
- **Backend:** ASP.NET Core Web API (.NET 8)
- **Database:** SQL Server with Entity Framework Core
- **Authentication:** JWT (JSON Web Tokens)
- **API Documentation:** Swagger UI

## Features

### User
- Register and login securely
- Search doctors by city, specialization, and rating
- View doctor profiles and available time slots
- Book and cancel appointments
- Rate doctors after completed appointments

### Admin
- Manage users, doctors, and specializations (full CRUD)
- View and cancel all appointments
- Dashboard with system statistics

## Project Structure
```
Fracto/
├── Fracto.API/          # ASP.NET Core Web API
│   ├── Controllers/     # API endpoints
│   ├── Services/        # TokenService (JWT)
│   └── Program.cs       # App configuration
├── Fracto.Data/
│   ├── Context/         # EF Core DbContext
│   └── Entities/        # Database models
└── Fracto.Frontend/     # Angular 21 app
    └── src/app/
        ├── core/        # Services, guards, interceptors
        ├── features/    # Pages (auth, user, admin)
        └── shared/      # Reusable components
```

## Running the Project

### Backend
```bash
cd Fracto.API
dotnet run
```

### Frontend
```bash
cd Fracto.Frontend
ng serve
```

Open `http://localhost:59750` in your browser.

## Test Credentials

- **Admin:** admin@fracto.com / Password123!
- **User:** testuser@gmail.com / User123!

## Running Tests
```bash
cd Fracto.Frontend
ng test
```
