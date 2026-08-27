# IoT Gateway Telemetry Mini-Dashboard

A lightweight end-to-end IoT telemetry monitoring dashboard built using Go and React.

The application simulates telemetry data for three IoT gateways and displays real-time temperature, humidity, status, historical readings, and temperature trends.

## Features

- Three IoT gateways
  - gateway-01
  - gateway-02
  - gateway-03
- Telemetry generated every 2 seconds
- REST API
- In-memory storage of recent readings
- Real-time temperature and humidity
- Gateway online status
- Gateway filter
- Historical telemetry logs
- Temperature trend chart
- Pause/Resume live updates
- Backend connection error handling
- Responsive dashboard UI

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Go
- net/http
- REST API
- CORS
- In-memory storage

### Deployment

- Vercel - Frontend
- Render - Backend
- Docker
- Docker Compose
- Nginx

## Project Structure

```text
iot-gateway-dashboard/
├── backend/
│   ├── main.go
│   ├── go.mod
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

Make sure the following are installed:

- Go
- Node.js
- npm
- Git
- Docker Desktop (for Docker setup)

## API

### Local API

```text
http://localhost:8080/api/telemetry
```

### Production API

```text
https://iot-gateway-dashboard.onrender.com/api/telemetry
```

The API returns telemetry data including:

- Gateway ID
- Temperature
- Humidity
- Status
- Timestamp

## Local Setup

### 1. Run Backend

From the project root:

```bash
cd backend
go run .
```

Backend runs at:

```text
http://localhost:8080
```

Telemetry API:

```text
http://localhost:8080/api/telemetry
```

### 2. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Docker Setup

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose build
docker compose up
```

The Docker Compose setup runs both the frontend and backend services.

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8080/api/telemetry
```

To stop the containers:

```bash
docker compose down
```

## Data Flow

```text
Go Telemetry Generator
        ↓
In-Memory Storage
        ↓
GET /api/telemetry
        ↓
React Frontend
        ↓
Dashboard
   ┌────┼────┐
   ↓    ↓    ↓
 Cards Chart Table
```

## Testing

The following functionality was tested:

- Backend API response
- Real-time telemetry updates
- Temperature and humidity updates
- Gateway filtering
- Temperature trend chart
- Historical telemetry logs
- Pause/Resume live updates
- Backend connection error handling
- Docker build and containers
- Frontend and backend deployment

Backend verification:

```bash
go vet ./...
go build .
```

## Live Demo

### Frontend

https://iot-gateway-dashboard.vercel.app

### Backend API

https://iot-gateway-dashboard.onrender.com/api/telemetry

## GitHub Repository

https://github.com/sonalkyadav15/iot-gateway-dashboard

## Author

Sonal K Yadav