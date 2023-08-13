import React, { useState } from "react";
import AuthContext from "./authContext";
import Cookies from "js-cookie";

const Auth = (props) => {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
  });
  const setUser = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    // console.log(data);
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    // console.log(userInfo);
    // Cookies.set("userInfo", JSON.stringify(data));
  };
  const signOut = () => {
    setUserInfo({
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      roleId: 0,
      role: "",
      password: "",
    });
    localStorage.removeItem("userInfo");
    Cookies.remove("userInfo");
  };
  return (
    <AuthContext.Provider value={{ userInfo, setUser, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Auth;
