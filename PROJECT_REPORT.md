# Student Management System - Project Report

## 1. Title
Student Management System

## 2. Problem Statement
Managing student records manually can be time-consuming and can lead to inconsistent records. This project provides a web-based application for storing and managing student information using CRUD operations.

## 3. Objectives
- Add student records.
- Display saved records.
- Edit existing records.
- Delete records.
- Validate input.
- Provide search functionality.
- Demonstrate REST API integration.

## 4. Technology Stack
| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | CSS |
| Backend | Django REST Framework |
| Database | SQLite |
| API Testing | Postman |
| Version Control | Git/GitHub |

## 5. Architecture
```text
User
  |
React Frontend
  |
REST API / JSON
  |
Django REST Framework
  |
Django ORM
  |
SQLite Database
```

## 6. Database Design
Student fields:
- id - Primary Key
- student_id - Unique student identifier
- name
- department
- email - Unique
- phone
- year

## 7. CRUD Implementation
- Create: POST `/api/students/`
- Read: GET `/api/students/`
- Update: PUT/PATCH `/api/students/<id>/`
- Delete: DELETE `/api/students/<id>/`

## 8. Validation
Both frontend and backend validation are implemented. Required fields, email format, phone length, year range, and duplicate unique values are checked.

## 9. Testing
Test valid and invalid Create, Read, Update, and Delete requests using the API documentation and Postman.

## 10. Future Enhancements
- Authentication and authorization
- Admin dashboard
- Pagination
- Export to CSV/PDF
- Student profile pages
