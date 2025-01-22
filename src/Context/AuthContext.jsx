import { createContext, useContext, useState, useEffect } from "react";
import CookieService from "encrypted-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const secretKey = import.meta.env.VITE_CRYPTO_KEY;


const [user, setUser] = useState(() => {
    const cookieUser = CookieService.getCookie("user", secretKey);
    return cookieUser ? JSON.parse(cookieUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    return CookieService.getCookie("token", secretKey) || null;
  });
  

  const handleChange = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    CookieService.eraseCookie("user", secretKey);
    CookieService.eraseCookie("token", secretKey);
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  const shouldKick = (e) => {
    if (e.response?.status === 401 || e.response?.status === 403) {
      logout();
    }
  };

  useEffect(() => {
    if (user && token) {
      CookieService.setCookie("user", JSON.stringify(user), 365, secretKey);
      CookieService.setCookie("token", token, 365, secretKey);
    }
  }, [user, token]);
  

  return (
    <AuthContext.Provider value={{ user, token, handleChange, logout, shouldKick }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
