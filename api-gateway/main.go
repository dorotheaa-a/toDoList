package main

import (
	"log"
	"net/http"

	"api-gateway/handlers"
)

func main() {
	// Auth routes
	http.HandleFunc("/auth/signup", handlers.SignupHandler)
	http.HandleFunc("/auth/login", handlers.LoginHandler)
	http.HandleFunc("/auth/logout", handlers.LogoutHandler)
	http.HandleFunc("/auth/forgot-password", handlers.ForgotPasswordHandler)
	http.HandleFunc("/auth/reset-password", handlers.ResetPasswordHandler)

	// Profile route
	http.HandleFunc("/profile", handlers.ProfileHandler)

	// Notes routes
	http.HandleFunc("/notes/collaborators", handlers.NoteCollaboratorHandler)
	http.HandleFunc("/notes/", handlers.NoteHandler) // includes /notes/{id}
	http.HandleFunc("/notes", handlers.NoteHandler)

	// Projects routes
	http.HandleFunc("/projects/collaborators", handlers.ProjectCollaboratorHandler)
	http.HandleFunc("/projects/", handlers.ProjectHandler) // includes /projects/{id}
	http.HandleFunc("/projects", handlers.ProjectHandler)

	// Reminders routes
	http.HandleFunc("/reminders/", handlers.ReminderHandler) // includes /reminders/{id}
	http.HandleFunc("/reminders", handlers.ReminderHandler)

	log.Println("API Gateway running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
