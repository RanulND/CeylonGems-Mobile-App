import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Text, DeviceEventEmitter } from "react-native";
import axios from "../services/ApiService";
import { getAccessToken, getRefreshToken, setAccessToken, removeTokens } from "../services/TokenService";

const AuthContext = createContext({
  currentUser: null,
  role: null,
  handleUser: async () => {},
  logout: async () => {},
  setRole: () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DeviceEventEmitter.addListener("user-change", handleUser);
    DeviceEventEmitter.addListener("token-expired", logout);

    initApp();
  }, []);

  const initApp = async () => {
    try {
      const token = await getRefreshToken();

      if (token) {
        try {
          const res = await axios.post("/refreshtoken", {
            refresh_token: token,
          });

          const { access_token } = res.data.data;
          await setAccessToken(access_token);
          await handleUser();
        } catch (err) {
          DeviceEventEmitter.emit("token-expired");
        }
      }
    } catch (_) {}
    setIsLoading(false);
  };

  const handleUser = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        const user = jwtDecode(token);
        setCurrentUser(user);
        setRole(false);
      } else {
        setUserData(null);
        setRole(null);
      }
    } catch (_) {
      setCurrentUser(null);
      setRole(null);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setRole(null);
    removeTokens();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        handleUser,
        logout,
        setRole
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
