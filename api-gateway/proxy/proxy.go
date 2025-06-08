package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

//forward incoming to url target
func Forward(w http.ResponseWriter, r *http.Request, targetURL string) {
	target, err := url.Parse(targetURL)
	if err != nil {
		http.Error(w, "Bad backend URL", http.StatusInternalServerError)
		return
	}

	// grab req & forward then give res
	// auto handle req method, header & body
	//also looks like real api to front
	proxy := httputil.NewSingleHostReverseProxy(target)

	// mod req so look like coming from proxy
	r.Host = target.Host
	
	// forward to back
	proxy.ServeHTTP(w, r)
}