package handlers

import (
	"net/http"
	"os"

	"api-gateway/proxy"
)
//handles all user related profile stuff
var backendURL = os.Getenv("BACKEND_URL")

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