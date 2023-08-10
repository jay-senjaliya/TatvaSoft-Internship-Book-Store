import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (Component) => {
  const Authentication = () => {
    const email = Cookies.get("auth_email");
    const navigate = useNavigate();

    useEffect(() => {
      if (!email) {
        navigate("/login");
      }
    }, [email]);

    return email ? <Component /> : <></>;
  };
  return Authentication;
};

export default WithAuth;
