import React, { useState } from "react";
import AuthContext from "./authContext";
import Cookies from "js-cookie";

const Auth = (props) => {
  const [userInfo, setUserInfo] = useState();
  const setUser = (data) => {
    console.log(data);
    setUserInfo(data);
    console.log(userInfo);
    Cookies.set("userInfo", JSON.stringify(data));
  };
  const signOut = () => {
    setUserInfo();
    Cookies.remove("userInfo");
  };
  return (
    <AuthContext.Provider value={{ userInfo, setUser, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Auth;
