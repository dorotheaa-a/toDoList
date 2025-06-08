package handlers

import (
	"bytes"
	"io"
	"net/http"
)

const backendURL = "http://localhost:3001"

func proxyRequest(w http.ResponseWriter, r *http.Request, target string) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request", http.StatusBadRequest)
		return
	}
	r.Body.Close()

	req, err := http.NewRequest(r.Method, target, bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}
	req.Header = r.Header.Clone()

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to connect to backend", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	for k, v := range resp.Header {
		w.Header()[k] = v
	}
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

// Auth Handlers
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/auth/signup")
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/auth/login")
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/auth/logout")
}

func ForgotPasswordHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/auth/forgot-password")
}

func ResetPasswordHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/auth/reset-password")
}

// Profile
func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/profile")
}

// Notes
func NoteHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}

func NoteCollaboratorHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/notes/collaborators")
}

// Projects
func ProjectHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}

func ProjectCollaboratorHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/projects/collaborators")
}

// Reminders
func ReminderHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}
