# React-Flask-Api
Full stack task management project using react, mysql, python flask, sqlalchemy. With Login, Registration, Dashboard authentication &amp; More

# Task Manager API
- [OpenAPI Spec](./openapi.yaml)

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
- [API Documentation](#api-documentation)  
- [Postman Collection](#postman-collection)  
- [Scaling Frontend-Backend Integration](#scaling-frontend-backend-integration)


## Features

- User Registration & Login with JWT  
- Add, Edit, Delete, and View Tasks  
- Search tasks in the dashboard  
- Responsive frontend with React/Next.js  
- Secure backend with Flask and MySQL/SQLite  

---

## Tech Stack

**Frontend:** React 
**Backend:** Python  
**Database:** MySQL  
**Authentication:** JWT  
**HTTP Client:** Axios  

---

## Setup

### Backend

1. Clone the repo:

```bash
git clone <repo_url>
cd backend

Scaling Frontend-Backend Integration

Frontend

Deploy as a static site using Vercel, Netlify, or AWS S3 + CloudFront.

Enable SSR (Next.js) for faster first load and SEO.

Use caching and CDN to reduce server load.

Backend

Containerize with Docker and deploy on Kubernetes, AWS ECS, or Heroku.

Use a reverse proxy (Nginx) for load balancing and SSL termination.

Use a managed database (RDS, Cloud SQL) for high availability.

Environment variables for secrets and configs.

Authentication & Security

JWT with short expiry and refresh tokens.

Serve frontend/backend over HTTPS.

Rate limiting, input validation, logging.

CI/CD & Monitoring

Automated pipelines for build/test/deploy (GitHub Actions).

Monitoring with Prometheus, Grafana, Sentry.

Scaling Strategy

Horizontal scaling for backend with multiple containers behind a load balancer.

Optimize API calls from frontend, cache frequently accessed data.

Separate read/write DB operations if load increases (read replicas, Redis caching).



## Setup
1. Clone repo
2. Install backend dependencies: `pip install -r requirements.txt`
3. Install frontend dependencies: `npm install`
4. Run backend: `python app.py`
5. Run frontend: `npm start`

## API Examples
### Register
POST /register
Body:
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

### Login
POST /login
Body:
{
  "email": "john@example.com",
  "password": "123456"
}


# Task Management App

A full-stack Task Management application built with **React/Next.js** frontend and **Flask** backend. It features **JWT-based authentication** and a **CRUD-enabled dashboard**.

---



---
