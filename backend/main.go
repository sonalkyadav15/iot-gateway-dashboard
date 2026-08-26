package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"sync"
	"time"
)

type Telemetry struct {
	GatewayID   string  `json:"gateway_id"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Status      string  `json:"status"`
	Timestamp   string  `json:"timestamp"`
}

var (
	telemetryData []Telemetry
	mu            sync.Mutex
)

var gateways = []string{
	"gateway-01",
	"gateway-02",
	"gateway-03",
}

func generateTelemetry() {
	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	for {
		<-ticker.C

		for _, gateway := range gateways {
			reading := Telemetry{
				GatewayID:   gateway,
				Temperature: 20 + rand.Float64()*10,
				Humidity:    50 + rand.Float64()*20,
				Status:      "ONLINE",
				Timestamp:   time.Now().UTC().Format(time.RFC3339),
			}

			mu.Lock()

			telemetryData = append(telemetryData, reading)

			if len(telemetryData) > 30 {
				telemetryData = telemetryData[len(telemetryData)-30:]
			}

			mu.Unlock()
		}
	}
}

func telemetryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	mu.Lock()
	data := append([]Telemetry(nil), telemetryData...)
	mu.Unlock()

	json.NewEncoder(w).Encode(data)
}

func main() {
	rand.Seed(time.Now().UnixNano())

	http.HandleFunc("/api/telemetry", telemetryHandler)

	go generateTelemetry()

	log.Println("Backend server running on http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		log.Fatal(err)
	}
}
