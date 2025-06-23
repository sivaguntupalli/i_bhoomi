# 📘 DEVELOPER_GUIDE.md

Welcome to the iBhoomi development environment! This guide outlines everything you need to get started working with the iBhoomi codebase, including system requirements, project structure, environment setup, and service startup.

---

## 🚀 Project Overview

**iBhoomi** is a modular land/property management platform built with Python-based Django microservices and a React frontend. Core services include user, property, and messaging components, each functioning independently and integrated via shared APIs.

---

## 🧰 System Requirements

Ensure the following tools are installed on your machine:

| Tool             | Version              | Notes                                |
|------------------|----------------------|--------------------------------------|
| **Python**        | 3.12.0               | Required for all backend services    |
| **PostgreSQL**    | 14.18                | Primary database engine              |
| **Node.js**       | 22.14.0              | Required for frontend (React)        |
| **npm**           | comes with Node.js   | For managing frontend packages       |
| **Redis**         | 8.0.1                | For real-time messaging queueing     |
| **Docker & Compose** | (optional)       | For containerized dev setups         |

> _Matching these versions is recommended for consistent local environments._

---

## 📦 Project Structure

```bash
i_bhoomi/
├── user-service/
├── property-service/
├── messaging-service/
├── frontend/
├── media-service/
├── search-service/
├── recommendation-service/
├── api-gateway/
├── docker-compose.yml
└── README.md
```

---

## 🔐 Environment Configuration

Each service includes a `.env.example` file.

1. **Copy** it:
   ```bash
   cp .env.example .env
   ```
2. **Fill in** any required values (like `DEBUG`, `SECRET_KEY`, `PORT`, etc.).
3. Never commit actual `.env` files—these are local to each environment.

---

## 🛠️ Setup Instructions

### Backend Services (user, property, messaging, etc.)

```bash
cd service-name/
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend/
npm install
cp .env.example .env
npm start
```

---

## 🧪 Testing

- **Backend**: Each Django service includes internal tests (`tests/`) and can be extended with `pytest`.
- **Frontend**: Cypress tests are located in `frontend/cypress/integration/`.

---

## 🧭 Port Reference

| Component           | Default Port |
|---------------------|--------------|
| user-service        | 8000         |
| property-service    | 8001         |
| messaging-service   | 8002         |
| frontend (React)    | 3000         |
| Redis               | 6379         |
| PostgreSQL          | 5432         |

> _Ensure ports are not conflicting before launching multiple services._

---

## 🐳 Docker Setup (Optional)

If you're using Docker:

```bash
docker-compose up --build
```

Make sure `.env` files are in place and volumes are mounted correctly.

---

## 💡 Common Issues

| Error Message                            | Solution                                                  |
|------------------------------------------|-----------------------------------------------------------|
| `ModuleNotFoundError`                    | Ensure you're in the virtualenv and `pip install` was run |
| `react-scripts not found`                | Run `npm install` inside `frontend/`                      |
| `Port already in use`                    | Use a different port in `.env` or kill the process using the port |
| Missing `.env` or misconfigured settings | Copy and complete `.env.example`                          |

---

## 🤝 Contributing Guidelines

- Follow PEP8 and ESLint standards
- Use clear commit messages and semantic versioning
- Tag stable releases (e.g., `v1.0`, `v1.1-dev`)
- Keep `.env` and secrets out of Git

---

For questions, improvements, or onboarding support, reach out to the repository maintainer or refer to the per-service `README.md` files.

Let’s build something great 👷‍♂️🌱
```

---

Let me know if you’d like me to save this as a file content block you can drop into your repo directly—or generate `.env.example` stubs for each service to round out your onboarding.