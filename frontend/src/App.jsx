import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/telemetry";

function App() {
  const [telemetry, setTelemetry] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("all");

  // Fetch telemetry from Go backend
  useEffect(() => {
    if (isPaused) {
      return;
    }

    const fetchTelemetry = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch telemetry");
        }

        const data = await response.json();

        setTelemetry(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to connect to backend");
      }
    };

    // Fetch immediately
    fetchTelemetry();

    // Fetch every 2 seconds
    const interval = setInterval(() => {
      fetchTelemetry();
    }, 2000);

    // Cleanup interval
    return () => clearInterval(interval);
  }, [isPaused]);

  // Filter telemetry according to selected gateway
  const filteredTelemetry =
    selectedGateway === "all"
      ? telemetry
      : telemetry.filter(
          (reading) => reading.gateway_id === selectedGateway
        );

  // Latest 10 temperatures for the chart
  const chartData = filteredTelemetry
    .slice(-10)
    .map((reading) => reading.temperature);

  // Gateway IDs
  const gatewayIds = [
    "gateway-01",
    "gateway-02",
    "gateway-03",
  ];

  // Prepare latest reading for each gateway card
  const gateways = gatewayIds.map((id) => {
    const readings = telemetry.filter(
      (item) => item.gateway_id === id
    );

    const latest = readings[readings.length - 1];

    return {
      id,
      temperature: latest
        ? latest.temperature.toFixed(1)
        : "--",
      humidity: latest
        ? latest.humidity.toFixed(1)
        : "--",
      status: latest
        ? latest.status
        : "OFFLINE",
    };
  });

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div>

          <div className="logo-section">
            <div className="logo-icon">◉</div>

            <div>
              <h2>IoT Hub</h2>
              <span>TELEMETRY</span>
            </div>
          </div>

          <div className="operator-card">
            <div className="operator-icon">◉</div>

            <div>
              <strong>Operator</strong>
              <small>Real-Time Monitor</small>
            </div>
          </div>

          <nav className="navigation">

            <button className="nav-item active">
              <span>▦</span>
              Dashboard
            </button>

            <button className="nav-item">
              <span>▣</span>
              Gateways
            </button>

            <button className="nav-item">
              <span>⌁</span>
              Telemetry
            </button>

            <button className="nav-item">
              <span>△</span>
              System Status
            </button>

          </nav>

        </div>

        <div className="sidebar-bottom">

          <button className="nav-item">
            <span>?</span>
            Support
          </button>

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">

          <div>
            <h1>IoT Gateway Operations Hub</h1>

            <p>
              REAL-TIME TELEMETRY MONITOR
            </p>
          </div>

          <div className="topbar-actions">

            <div className="live-indicator">

              <span className="live-dot"></span>

              {isPaused
                ? "STREAM PAUSED"
                : "LIVE STREAM"}

            </div>

            <button className="settings-button">
              ⚙
            </button>

          </div>

        </header>

        {/* Dashboard */}
        <section className="dashboard-content">

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: "15px",
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(255, 80, 80, 0.1)",
                color: "#ff8080",
                border: "1px solid rgba(255,80,80,0.3)",
              }}
            >
              {error}
            </div>
          )}

          {/* Gateway Cards */}
          <section className="gateway-grid">

            {gateways.map((gateway) => (

              <div
                className="gateway-card"
                key={gateway.id}
              >

                <div className="card-header">

                  <div className="gateway-name">
                    <span>▣</span>
                    {gateway.id}
                  </div>

                  <div className="status-badge">

                    <span className="status-dot"></span>

                    {gateway.status}

                  </div>

                </div>

                <div className="metrics">

                  <div>

                    <label>
                      TEMPERATURE
                    </label>

                    <div className="temperature">

                      {gateway.temperature}

                      <span>
                        °C
                      </span>

                    </div>

                  </div>

                  <div className="humidity-block">

                    <label>
                      HUMIDITY
                    </label>

                    <div className="humidity">

                      {gateway.humidity}

                      <span>
                        %
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </section>


          {/* Controls */}
          <section className="controls-panel">

            <div>

              <label htmlFor="gateway-filter">
                GATEWAY FILTER
              </label>

              <select
                id="gateway-filter"
                value={selectedGateway}
                onChange={(event) =>
                  setSelectedGateway(event.target.value)
                }
              >

                <option value="all">
                  All Gateways
                </option>

                <option value="gateway-01">
                  gateway-01
                </option>

                <option value="gateway-02">
                  gateway-02
                </option>

                <option value="gateway-03">
                  gateway-03
                </option>

              </select>

            </div>

            <button
              className="pause-button"
              onClick={() =>
                setIsPaused(!isPaused)
              }
            >

              {isPaused
                ? "▶ Resume Live Updates"
                : "❚❚ Pause Live Updates"}

            </button>

          </section>


          {/* Main Grid */}
          <section className="main-grid">

            {/* Temperature Chart */}
            <div className="panel chart-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Temperature Trend
                  </h2>

                  <span>
                    Live gateway temperature readings
                  </span>

                </div>

                <div className="time-buttons">

                  <button>
                    1H
                  </button>

                  <button className="selected">
                    LIVE
                  </button>

                  <button>
                    24H
                  </button>

                </div>

              </div>

              <div className="chart-area">

                <div className="chart-y-labels">

                  <span>30°</span>
                  <span>25°</span>
                  <span>20°</span>
                  <span>15°</span>
                  <span>10°</span>

                </div>

                <div className="chart">

                  <div className="grid-line line-1"></div>
                  <div className="grid-line line-2"></div>
                  <div className="grid-line line-3"></div>
                  <div className="grid-line line-4"></div>

                  <svg
                    viewBox="0 0 500 220"
                    preserveAspectRatio="none"
                    className="chart-svg"
                  >

                    <defs>

                      <linearGradient
                        id="temperatureGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >

                        <stop
                          offset="0%"
                          stopColor="#00eaff"
                        />

                        <stop
                          offset="50%"
                          stopColor="#4edfa5"
                        />

                        <stop
                          offset="100%"
                          stopColor="#00a6ff"
                        />

                      </linearGradient>

                    </defs>

                    {/* Real telemetry temperature chart */}
                    {chartData.length > 1 && (
                      <polyline
                        points={chartData
                          .map((temperature, index) => {

                            const x =
                              (index /
                                (chartData.length - 1)) *
                              500;

                            const minTemp = 15;
                            const maxTemp = 30;

                            const clampedTemp =
                              Math.min(
                                Math.max(
                                  temperature,
                                  minTemp
                                ),
                                maxTemp
                              );

                            const y =
                              220 -
                              ((clampedTemp - minTemp) /
                                (maxTemp - minTemp)) *
                                190;

                            return `${x},${y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke="url(#temperatureGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                  </svg>

                </div>

              </div>

            </div>

            {/* Historical Table */}
            <div className="panel history-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Historical Log Stream
                  </h2>

                  <span>
                    Latest telemetry readings
                  </span>

                </div>

              </div>

              <div className="table-container">

                {telemetry.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ◌
                    </div>

                    <h3>
                      Waiting for telemetry
                    </h3>

                    <p>
                      Live readings will appear here.
                    </p>

                  </div>

                ) : (

                  <table className="telemetry-table">

                    <thead>

                      <tr>
                        <th>GATEWAY ID</th>
                        <th>STATUS</th>
                        <th>TEMP</th>
                        <th>HUMIDITY</th>
                        <th>TIMESTAMP</th>
                      </tr>

                    </thead>

                    <tbody>

                      {filteredTelemetry
                        .slice(-10)
                        .reverse()
                        .map((reading, index) => (

                          <tr
                            key={`${reading.timestamp}-${index}`}
                          >

                            <td className="gateway-cell">
                              {reading.gateway_id}
                            </td>

                            <td>

                              <span className="table-status">

                                <span className="status-dot"></span>

                                {reading.status}

                              </span>

                            </td>

                            <td>
                              {reading.temperature.toFixed(1)}°C
                            </td>

                            <td>
                              {reading.humidity.toFixed(1)}%
                            </td>

                            <td className="timestamp-cell">

                              {new Date(
                                reading.timestamp
                              ).toLocaleTimeString()}

                            </td>

                          </tr>

                        ))}

                    </tbody>

                  </table>

                )}

              </div>

            </div>

          </section>



        </section>

      </main>

    </div>
  );
}

export default App;