import Cookies from "js-cookie";
import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../context/authContext";

const WithAuth = (Component) => {
  const Authentication = () => {
    // const email = Cookies.get("auth_email");
    const context = useAuthContext();
    const { user } = context;
    console.log(user);
    // const data = localStorage.getItem("userInfo");
    const userInfo = user ? user : null;
    const navigate = useNavigate();

    useEffect(() => {
      if (!userInfo) {
        navigate("/login");
      }
    }, [userInfo]);

    return userInfo ? <Component /> : <></>;
  };
  return Authentication;
};

export default WithAuth;
