import React, { useEffect, useMemo, useState } from "react";
import { login as loginRequest, logout as logoutRequest, refreshSession, setAuthentication, signup as signupRequest } from "./apiClient";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    setAuthentication("", () => {
      setUser(null);
      setStatus("ready");
    });
    refreshSession()
      .then((session) => setUser(session?.user || null))
      .catch((error) => {
        console.error("Could not verify the saved session:", error);
        setUser(null);
      })
      .finally(() => setStatus("ready"));
  }, []);

  const login = async (email, password) => {
    const result = await loginRequest(email, password);
    setUser(result.data.user);
    return result.data.user;
  };

  const signup = async (name, email, password) => {
    const result = await signupRequest(name, email, password);
    setUser(result.data.user);
    return result.data.user;
  };

  const continueAsGuest = () => {
    setAuthentication("");
    setUser({ id: null, name: "Guest", email: "", role: "guest" });
  };

  const exitGuest = () => {
    setAuthentication("");
    setUser(null);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setStatus("ready");
    }
  };

  const value = useMemo(() => ({
    user,
    status,
    login,
    signup,
    continueAsGuest,
    exitGuest,
    logout,
  }), [user, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
