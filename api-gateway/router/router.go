package router

import (
	"net/http"

	"api-gateway/handlers"
)

func SetupRouter() *http.ServeMux {
	
	// Auth routes
	mux.HandleFunc("/auth/signup", handlers.SignupHandler)
	mux.HandleFunc("/auth/login", handlers.LoginHandler)
	mux.HandleFunc("/auth/logout", handlers.LogoutHandler)
	mux.HandleFunc("/auth/forgot-password", handlers.ForgotPasswordHandler)
	mux.HandleFunc("/auth/reset-password", handlers.ResetPasswordHandler)

	// Profile route
	mux.HandleFunc("/profile", handlers.ProfileHandler)

	// Notes routes
	mux.HandleFunc("/notes/collaborators", handlers.NoteCollaboratorHandler)
	mux.HandleFunc("/notes/", handlers.NoteHandler) // includes /notes/{id}
	mux.HandleFunc("/notes", handlers.NoteHandler)

	// Projects routes
	mux.HandleFunc("/projects/collaborators", handlers.ProjectCollaboratorHandler)
	mux.HandleFunc("/projects/", handlers.ProjectHandler) // includes /projects/{id}
	mux.HandleFunc("/projects", handlers.ProjectHandler)

	// Reminders routes
	mux.HandleFunc("/reminders/", handlers.ReminderHandler) // includes /reminders/{id}
	mux.HandleFunc("/reminders", handlers.ReminderHandler)

	return mux
}