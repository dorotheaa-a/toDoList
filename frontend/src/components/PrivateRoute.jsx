import React from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


/**
 * A component that protects routes, redirecting unauthenticated users to the login page.
 * @param {object} props 
 * @param {React.ReactNode} props.children - protected routesss go hier
 */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth(); // grab authstatus

  //render loading
  if (loading) {
    return <div>Loading authentication...</div>; // spinner or load screen?
  }

  // if auth yes, grab the children (kidnapping), if not kicked to home
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
