import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  roleId: 0,
  role: "",
  password: "",
};

const initialState = {
  setUser: () => {},
  user: initialValues,
  signOut: () => {},
};

export const AuthContext = createContext(initialState);

export const Auth = ({ children }) => {
  const [userData, setUserData] = useState(initialValues);
  const navigate = useNavigate();
  console.log(userData);

  const setUser = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserData(data);
    console.log(data);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));

    if (!data) {
      setUserData(initialValues);
      navigate("/login");
    } else {
      setUserData(data);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("userInfo");
    setUserData(initialValues);
    navigate("/login");
  };

  const value = {
    user: userData,
    setUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// import React from "react";

// const AuthContext = React.createContext();

// export default AuthContext;
