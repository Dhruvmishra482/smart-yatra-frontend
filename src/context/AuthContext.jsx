import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    loading: true,
  });

  // On app load → check for token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const user = {
          ...decoded,
          accountType: decoded.role, 
        };

        setAuth({
          token,
          user,
          loading: false,
        });
      } catch (error) {
      
        localStorage.removeItem("token");
        setAuth({ token: null, user: null, loading: false });
      }
    } else {
      setAuth({ token: null, user: null, loading: false });
    }
  }, []);

  // On login → store token and decode
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    const user = {
      ...decoded,
      accountType: decoded.role, 
         firstName: decoded.firstName
    };

    setAuth({ token, user, loading: false });
  };

  // On logout → remove token and reset state
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null, loading: false });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!auth.token,
        user: auth.user,
        isAdmin: auth.user?.accountType === "admin",
        isVisitor: auth.user?.accountType === "visitor",
        login,
        logout,
        loading: auth.loading,
        token: auth.token, // in case someone needs raw token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
