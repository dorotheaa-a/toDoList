import React, { createContext, useState, useEffect, useContext } from 'react';
//rename to avoid conflictssfdnsa
import {
  login as authLogin, // Renamed 
  logout as authLogout, // Renamed
  getUserProfile,
  getAccessToken,
  getRefreshToken,
  setTokens as setAuthTokens, // Renamed
  removeTokens as removeAuthTokens, // Renamed
} from '../service/userServices'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // check auth status on app load, re-auth if token exist
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = getAccessToken();
            if(token) {
                try{
                    //fetch user profile if exists token
                    const profile = await getUserProfile();
                    setUser(profile);
                    setIsAuthenticated(true);
                } catch (error) {
                    //fail (token invalid or idk sth else) clear token
                    console.error("Failed to re-authenticate from stored token:", error);
                    removeAuthTokens();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkAuthStatus();
    }, []); //ensure only run once 

    //user login func
    const login = async (email, password) => {
        setAuthError(null);
        try{
            setLoading(true);
            const resposne = await authLogin({email, password});
            const profile = await getUserProfile();
            setUser(profile);
            setIsAuthenticated(true);
            setLoading(false);
            return profile;
        } catch (error) {
            console.error("Login failed in AuthContext:", error);
            setAuthError(error.message);
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            throw error;
        }
    };

    //handle logout
    const logout = async () => {
        setLoading(true);
        await authLogout();
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    };

    // manually set auth data
    const setAuthData = (accessToken, refreshToken, userData = null) => {
        setAuthTokens(accessToken, refreshToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        authError,
        login,
        logout,
        setAuthData,
        getAccessToken,
        getRefreshToken,
    }), [user, isAuthenticated, loading, authError]);
    
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}