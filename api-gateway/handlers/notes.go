package handlers

import (
	"net/http"
	"os"

	"api-gateway/proxy"
)

var notesURL = os.Getenv("BACKEND_URL")

// Notes
func NoteHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}

func NoteCollaboratorHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/notes/collaborators")
}