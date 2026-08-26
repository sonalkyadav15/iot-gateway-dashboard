# IoT Gateway Telemetry Mini-Dashboard

A lightweight end-to-end IoT telemetry monitoring dashboard built using Go and React.

The application simulates telemetry data for three IoT gateways and displays the latest readings in a real-time dashboard.

## Features

- Go backend telemetry simulator
- Three fictional gateways:
  - gateway-01
  - gateway-02
  - gateway-03
- Mock telemetry generated every 2 seconds
- In-memory storage of the latest 30 readings
- REST API for telemetry data
- CORS enabled for local frontend communication
- React dashboard
- Live temperature and humidity metrics
- Online status for each gateway
- Historical table showing latest 10 readings
- Gateway filter
- Pause and resume live updates
- Real-time temperature trend chart
- Backend connection error handling
- Responsive dark-themed dashboard UI

## Tech Stack

### Backend

- Go
- Go net/http
- REST API
- CORS
- In-memory telemetry storage

### Frontend

- React
- Vite
- JavaScript
- CSS
- SVG temperature chart

## Project Structure

```text
iot-gateway-dashboard/
│
├── backend/
│   ├── go.mod
│   └── main.go
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md


## Prerequisites

Make sure the following are installed on your system:

- Go
- Node.js
- npm
- Git

Check the installed versions:

go version
node -v
npm -v
git --version


## Run the Backend

Open a terminal and navigate to the backend folder:

cd backend

Run the backend:

go run .

The backend will start at:

http://localhost:8080

Telemetry API:

http://localhost:8080/api/telemetry


## Run the Frontend

Open another terminal and navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Open the URL shown by Vite, normally:

http://localhost:5173


## API Response

The telemetry API returns JSON readings similar to:

{
  "gateway_id": "gateway-01",
  "temperature": 24.5,
  "humidity": 60.2,
  "status": "ONLINE",
  "timestamp": "2026-08-13T10:15:30Z"
}


## Dashboard Controls

### Gateway Filter

The gateway filter allows the user to select:

- All Gateways
- gateway-01
- gateway-02
- gateway-03

When a gateway is selected, the temperature chart and historical table display readings for that gateway.

### Pause Live Updates

The Pause Live Updates button stops frontend telemetry polling.

Clicking Resume Live Updates starts live polling again.


## Data Flow

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


## Telemetry Update Frequency

The backend generates new telemetry every 2 seconds.

The React frontend polls the backend every 2 seconds while live updates are enabled.


## Error Handling

If the Go backend is unavailable, the frontend displays:

Unable to connect to backend

Once the backend is available again, the dashboard can connect to the backend again and receive telemetry.


## Testing

The backend was tested using:

go vet ./...

Backend build was verified using:

go build .

The following functionality was tested:

- Backend API response
- Live telemetry updates
- 2-second data updates
- Gateway filter
- Temperature chart
- Historical telemetry table
- Pause live updates
- Resume live updates
- Backend connection error handling


## Assessment Requirements Covered

The project covers the required functionality:

- Go backend for simulated IoT telemetry
- Three gateways
- Telemetry generation every 2 seconds
- Storage of recent telemetry readings
- REST API
- CORS support
- React dashboard
- Gateway metrics cards
- Historical log table
- Gateway filter
- Pause/resume live updates
- Temperature trend visualization


## Author

Sonal K Yadav