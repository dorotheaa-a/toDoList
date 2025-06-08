package handlers

import (
	"net/http"
	"os"

	"api-gateway/proxy"
)

var remindersURL = os.Getenv("BACKEND_URL")

// Reminders
func ReminderHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}
