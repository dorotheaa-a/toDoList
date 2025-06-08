package main

import (
	"log"
	"net/http"
	"os"

	"api-gateway/handlers"
	"api-gateway/router"
)

func main() {

	//if want, load env with dotenv

	port := os.Getenv("GO_PORT")
	if port == "" {
		port = "8080"
	}

	r := router.SetupRouter() // this sets up all routes using handlers

	log.Printf("API Gateway running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
