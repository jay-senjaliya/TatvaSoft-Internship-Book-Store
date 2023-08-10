import React from "react";

const AuthContext = React.createContext();

export default AuthContext;

// import Cookies from "js-cookie";
// import React, { createContext, useState } from "react";

// const initialValues = {
//   id: 0,
//   email: "",
//   firstName: "",
//   lastName: "",
//   roleId: 0,
//   role: "",
//   password: "",
// };

// const initialState = {
//   setUserData: () => {},
//   user: initialValues,
//   signOut: () => {},
// };

// export const AuthContext = createContext(initialState);

// const Auth = (props) => {
//   const [user, setUser] = useState();

//   const setUserData = (data) => {
//     // console.log(data);
//     setUser(data);
//     console.log(user);
//     Cookies.set("userInfo", JSON.stringify(data));
//   };

//   const signOut = () => {
//     setUserData();
//     Cookies.remove("userInfo");
//   };

//   const value = {
//     user,
//     setUserData,
//     signOut,
//   };

//   return (
//     <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
//   );
// };

// export default Auth;
