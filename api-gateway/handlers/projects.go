package handlers

import (
	"net/http"
	"os"

	"api-gateway/proxy"
)

var projectsURL = os.Getenv("BACKEND_URL")

// Projects
func ProjectHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+r.URL.Path)
}

func ProjectCollaboratorHandler(w http.ResponseWriter, r *http.Request) {
	proxyRequest(w, r, backendURL+"/projects/collaborators")
}
