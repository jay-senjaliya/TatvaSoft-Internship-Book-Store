import React from "react";
import Breadcrumb from "../component/Breadcrumb";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authservice from "../services/authService";
import { useNavigate } from "react-router-dom";
import PageHeading from "../component/PageHeading";
import { useAuthContext } from "../context/authContext";

const Login = () => {
  const context = useAuthContext();
  const { setUser, user } = context;
  // console.log(userInfo);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const handleSubmit = async (values) => {
    // console.log(values);
    await authservice
      .Login(values)
      .then((res) => {
        // console.log(res.data.result);
        if (res && res.status === 200) {
          toast.success("User Logged in Successfully!", {
            position: "bottom-right",
          });
          setUser(res.data.result);
          // console.log(user);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "bottom-right",
        });
      });
  };
  return (
    <>
      <Breadcrumb value="Login" />
      <PageHeading heading="Login or Create an Account" />
      <div className="container" style={{ marginTop: 50, display: "flex" }}>
        <div style={{ width: "45%", marginRight: 50 }}>
          <h1
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 20,
              marginTop: 0,
              color: "#414141",
              fontWeight: 550,
            }}
          >
            New Customer
          </h1>
          <hr />
          <p
            style={{
              margin: "20px auto 20px 0px",
              color: "#838383",
              fontSize: 15,
              fontFamily: "'Roboto-Light', sans-serif",
            }}
          >
            Registration is free and easy.
          </p>
          <ul style={{ marginLeft: -15 }}>
            <li
              style={{
                color: "#212121",
                fontSize: 15,
                fontFamily: "'Roboto', sans-serif",
                marginBottom: "8px",
              }}
            >
              Faster checkout
            </li>
            <li
              style={{
                color: "#212121",
                fontSize: 15,
                fontFamily: "'Roboto', sans-serif",
                marginBottom: "8px",
              }}
            >
              Save multiple shipping addresses
            </li>
            <li
              style={{
                color: "#212121",
                fontSize: 15,
                fontFamily: "'Roboto', sans-serif",
                marginBottom: "8px",
              }}
            >
              View and track orders and more
            </li>
          </ul>
          <button
            className="btn"
            style={{
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "#f14d54",
              height: 45,
              width: 220,
              margin: "156px auto 80px 0px",
              color: "white",
              fontWeight: 500,
              borderRadius: 0,
            }}
            onClick={() => navigate("/register")}
          >
            Create an Account
          </button>
        </div>
        <div style={{ width: "45%" }}>
          <h1
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 20,
              marginTop: 0,
              color: "#414141",
              fontWeight: 550,
            }}
          >
            Registered Customers
          </h1>
          <hr />
          <p
            style={{
              margin: "20px auto 20px 0px",
              fontSize: 15,
              color: "#838383",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            If you have an account with us, please log in.
          </p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, errors, handleBlur, setFieldValue }) => {
              return (
                <Form>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Email address<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="text"
                      error={errors.email}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="email"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  <div className="">
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "40px auto 15px 0px",
                      }}
                    >
                      Password<sup>*</sup>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      error={errors.password}
                      onBlur={handleBlur}
                      className="form-control"
                      id="password"
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="password"></ErrorMessage>
                    </FormHelperText>
                  </div>

                  <button
                    className="btn"
                    type="submit"
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      backgroundColor: "#f14d54",
                      height: 45,
                      width: 100,
                      margin: "60px auto 80px 0px",
                      color: "white",
                      fontWeight: 500,
                      borderRadius: 0,
                    }}
                  >
                    Login
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
