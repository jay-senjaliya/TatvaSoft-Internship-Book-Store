import React from "react";
import Breadcrumb from "../component/Breadcrumb";
import PageHeading from "../component/PageHeading";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import authservice from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name required"),
    lastName: Yup.string().required("Last Name required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: 2,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      delete values.confirmPassword;
      await authservice
        .Register(values)
        .then((res) => {
          if (res && res.status === 200) {
            toast.success("User registered successfully!", {
              position: "bottom-right",
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.error, { position: "bottom-right" });
        });
    },
  });

  return (
    <>
      <Breadcrumb value="Create an Account" />
      <PageHeading heading="Login or Create an Account" />
      <div
        className="container"
        style={{ marginTop: 50, fontFamily: "'Roboto', sans-serif" }}
      >
        {/* <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            roleId: 2,
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit}
        >
          {({ values, errors, handleBlur, setFieldValue }) => {
            <Form>
              <> */}
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h1
              style={{
                fontSize: 20,
                color: "#414141",
                margin: 0,
                fontWeight: 600,
              }}
            >
              Personal Information
            </h1>
            <hr style={{ marginTop: 20 }} />
            <p style={{ color: "#838383", fontSize: 15, marginBottom: 0 }}>
              Please enter the following information to create your account
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "49%" }}>
                <label
                  htmlFor="firstName"
                  className="form-label"
                  style={{
                    fontSize: 15,
                    color: "#414141",
                    fontFamily: "'Roboto', sans-serif",
                    margin: "20px auto 0px 0px",
                  }}
                >
                  First Name<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  id="firstName"
                  type="text"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  style={{
                    height: 40,
                    borderRadius: 0,
                    color: "#212121",
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: 15,
                  }}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {/* <ErrorMessage name="firstName"></ErrorMessage> */}
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </div>
              <div style={{ width: "49%" }}>
                <label
                  htmlFor="lastName"
                  className="form-label"
                  style={{
                    fontSize: 15,
                    color: "#414141",
                    fontFamily: "'Roboto', sans-serif",
                    margin: "20px auto 0px 0px",
                  }}
                >
                  Last Name<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  style={{
                    borderRadius: 0,
                    color: "#212121",
                    height: 40,
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: 15,
                  }}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </div>
            </div>
            <label
              htmlFor="email"
              className="form-label"
              style={{
                fontSize: 15,
                color: "#414141",
                fontFamily: "'Roboto', sans-serif",
                margin: "40px auto 0px 0px",
              }}
            >
              Email Address<sup>*</sup>
            </label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="text"
              {...formik.getFieldProps("email")}
              style={{
                borderRadius: 0,
                height: 40,
                color: "#212121",
                fontFamily: "'Roboto', sans-serif",
                marginTop: 15,
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            ) : null}
          </div>
          <div style={{ margin: "70px auto 60px 0px" }}>
            <h1
              style={{
                fontSize: 20,
                color: "#414141",
                margin: 0,
                fontWeight: 600,
              }}
            >
              Login Information
            </h1>
            <hr style={{ marginTop: 20 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "49%" }}>
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{
                    fontSize: 15,
                    color: "#414141",
                    fontFamily: "'Roboto', sans-serif",
                    margin: "20px auto 0px 0px",
                  }}
                >
                  Password<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                  style={{
                    height: 40,
                    borderRadius: 0,
                    color: "#212121",
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: 15,
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </div>
              <div style={{ width: "49%" }}>
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                  style={{
                    fontSize: 15,
                    color: "#414141",
                    fontFamily: "'Roboto', sans-serif",
                    margin: "20px auto 0px 0px",
                  }}
                >
                  Confirm Password<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  style={{
                    borderRadius: 0,
                    color: "#212121",
                    height: 40,
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: 15,
                  }}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <FormHelperText error>
                    {formik.errors.confirmPassword}
                  </FormHelperText>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn"
              style={{
                height: 45,
                width: 136,
                backgroundColor: "#f14d54",
                margin: "0px auto 80px 0px",
                borderRadius: 0,
                color: "white",
                fontWeight: 600,
              }}
            >
              Register
            </button>
          </div>
        </form>
        {/* </>
            </Form>;
          }}
        </Formik> */}
      </div>
    </>
  );
};

export default Register;
