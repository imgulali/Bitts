import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../api/authAPI";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (formData) => {
    const { error, data } = await registerUserApi(formData);
    if (data) {
      const user = data.data;
      const { authToken } = user;
      localStorage.setItem("authToken", JSON.stringify(authToken));
      setCurrentUser(user);
    }
    setLoading(false);
    return error;
  };

  const loginUser = async (formData) => {
    const { error, data } = await loginUserApi(formData);
    if (data) {
      const user = data.data;
      const { authToken } = user;
      localStorage.setItem("authToken", JSON.stringify(authToken));
      setCurrentUser(user);
    }
    setLoading(false);
    return error;
  };

  const fetchUser = async () => {
    const getAuthToken = localStorage.getItem("authToken");
    if (getAuthToken) {
      const authToken = await JSON.parse(getAuthToken);
      const { error, data } = await fetchUserApi(authToken);
      if (data) {
        const user = data.data;
        setCurrentUser(user);
      }
      if (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  const updateUser = async (formData) => {
    const getAuthToken = localStorage.getItem("authToken");
    if ({getAuthToken}) {
      const authToken = await JSON.parse(getAuthToken);
      const { error, data } = await updateUserApi(authToken, formData);
      if (error) {
        return error;
      }
      const user = data.data;
      setCurrentUser({ ...currentUser, ...user });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
