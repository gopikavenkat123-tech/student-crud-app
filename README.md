# Student Management System

A complete CRUD-based full-stack web application built with React, Django REST Framework, and SQLite.

## Features
- Create student records
- Read/list student records
- Update student records
- Delete student records
- Client-side validation
- Server-side validation
- Search students
- REST API
- Responsive UI
- SQLite database
- Postman-ready API endpoints

## Technology Stack
- Frontend: React + Vite
- Backend: Django + Django REST Framework
- Database: SQLite
- API: REST/JSON

## Project Structure
```text
student-management-system/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   └── students/
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
├── API_DOCUMENTATION.md
└── PROJECT_REPORT.md
```

## Backend Setup
Open a terminal in `backend`:

```bash
python -m venv venv
```

Windows PowerShell:
```powershell
venv\Scripts\Activate.ps1
```

Then:
```bash
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend:
`http://127.0.0.1:8000`

## Frontend Setup
Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Frontend:
`http://localhost:5173`

## API
- GET `/api/students/`
- POST `/api/students/`
- GET `/api/students/<id>/`
- PUT `/api/students/<id>/`
- PATCH `/api/students/<id>/`
- DELETE `/api/students/<id>/`

## GitHub
After testing:

```bash
git init
git add .
git commit -m "Complete student management CRUD application"
```

Create a GitHub repository and follow GitHub's displayed push commands.
