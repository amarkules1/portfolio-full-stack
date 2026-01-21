# Full-Stack Portfolio Template

A modern, full-stack portfolio application template built with **Flask (Python)**, **React**, and **PostgreSQL**. Designed to be easily customizable and deployable using **Docker**.

## 🚀 Features

-   **Backend**: Flask REST API serving data from a PostgreSQL database.
-   **Frontend**: React application for a dynamic and responsive UI.
-   **Data Processing**: Pandas integration for efficient data handling (e.g., for analytics or complex data visualization).
-   **Database**: PostgreSQL for robust data storage.
-   **Admin Dashboard**: secure admin area for managing projects and blog posts.
-   **Deployment Ready**: Docker configuration included for easy containerization.

## 🛠 Tech Stack

-   **Backend**: Python 3.10+, Flask, SQLAlchemy, Pandas
-   **Frontend**: React 18, Bootstrap 5
-   **Database**: PostgreSQL
-   **Containerization**: Docker

├── main.py                 # Flask application entry point
├── portfolio-frontend/              # React frontend source code
│   ├── src/                # React components and logic
│   ├── public/             # Static assets
│   └── build/              # Production build output (served by Flask)
├── schema/                 # Database schema scripts
├── templates/              # Flask Jinja2 templates (mainly for Admin UI)
├── Dockerfile              # Docker production build configuration
├── Pipfile & Pipfile.lock  # Python dependency management (Pipenv)
└── .env                    # Environment variables (not committed)
```

## ⚡ Getting Started

### Prerequisites

-   Python 3.10+
-   Node.js & npm
-   PostgreSQL installed and running
-   Pipenv (`pip install pipenv`)

### Local Development Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/amarkules1/portfolio-full-stack.git
    cd portfolio-full-stack
    ```

2.  **Backend Setup**
    ```bash
    # Install dependencies
    pipenv install --dev

    # Create .env file
    cp .env.example .env
    # Update .env with your database credentials:
    # DATABASE_CONN_STRING=postgresql://user:password@your_db_ip:5432/your_db_name
    # SECRET_KEY=your_secret_key
    # ADMIN_PASSWORD=your_admin_password
    ```

3.  **Frontend Setup**
    ```bash
    cd portfolio-frontend
    npm install
    npm start
    # The frontend will be available at http://localhost:3000
    ```

4.  **Run the Backend**
    ```bash
    # In the root directory
    pipenv shell
    python main.py
    # The API will be available at http://localhost:5000
    ```

### Database Setup

Run the SQL scripts in the `schema/` directory to create the necessary tables in your PostgreSQL database.

## 🐳 Deployment

This project includes a `Dockerfile` for building a production-ready container.

1.  **Build the React App**
    ```bash
    cd portfolio-frontend
    npm run build
    cd ..
    ```

2.  **Build the Docker Image**
    ```bash
    docker build -t my-portfolio .
    ```

3.  **Run the Container**
    ```bash
    docker run -p 5000:5000 --env-file .env my-portfolio
    ```

## 📝 Customization

-   **Frontend**: Edit `portfolio-frontend/src` to change the look and feel.
-   **Backend**: Modify `main.py` to add new API endpoints.
-   **Database**: Update `schema/` and SQLAlchemy models in `main.py` to extend data structures.
