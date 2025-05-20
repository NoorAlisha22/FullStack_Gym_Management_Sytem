# Gym Management System

A full-stack Gym Management System built with React and FastAPI, backed by a MySQL database.
Features include member registration, secure authentication, attendance tracking, and subscription plan management. Designed for scalability, efficient data handling, and a clean, user-friendly interface.

---

## Features

* User registration and login with secure authentication
* Password recovery functionality
* Member management dashboard with attendance tracking
* Subscription and plan management
* Responsive and intuitive React frontend
* FastAPI backend with RESTful APIs
* MySQL database for reliable data storage

---

## Tech Stack

* Frontend: React, JavaScript, CSS
* Backend: Python, FastAPI
* Database: MySQL
* Authentication: Basic auth (specify what you use)
* Other: Axios (for API calls), React Router

---

## Installation

### Backend

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/gym-management-system.git
   cd gym-management-system/backend
   ```
2. Create and activate a virtual environment
   ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies
    ```bash
    pip install -r requirements.txt
    ```
4. Configure your MySQL database credentials in the config file or environment variables.

5. Run the FastAPI server
    ```bash
    uvicorn main:app --reload
    ```

### Frontend
1. Navigate to the frontend directory
    ```bash
    cd ../frontend
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the React development server
   ```bash
    npm start
   ```

##Folder Structure

gym-management-system/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            
│   │   ├── models/              
│   │   ├── routes/             
│   │   ├── schemas/             
│   │   ├── services/            
│   │   └── config.py            
│   ├── venv/ (optional)         
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

##License
This project is licensed under the MIT License.
