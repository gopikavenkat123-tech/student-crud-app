# API Documentation

Base URL: `http://127.0.0.1:8000`

## 1. Create Student
**POST** `/api/students/`

Example JSON:
```json
{
  "student_id": "STU001",
  "name": "Arun Kumar",
  "department": "Computer Science",
  "email": "arun@example.com",
  "phone": "9876543210",
  "year": 2
}
```

## 2. Read All Students
**GET** `/api/students/`

## 3. Read One Student
**GET** `/api/students/1/`

## 4. Update Student
**PUT** `/api/students/1/`

Example JSON:
```json
{
  "student_id": "STU001",
  "name": "Arun Kumar Updated",
  "department": "Computer Science",
  "email": "arun@example.com",
  "phone": "9876543210",
  "year": 3
}
```

## 5. Partial Update
**PATCH** `/api/students/1/`

## 6. Delete Student
**DELETE** `/api/students/1/`

## Validation
- Student ID is required and unique.
- Name is required.
- Department is required.
- Email must be valid and unique.
- Phone must contain 10 digits.
- Year must be between 1 and 4.
