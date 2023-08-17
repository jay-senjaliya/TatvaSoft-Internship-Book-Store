import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import { ErrorMessage, Form, Formik } from "formik";
import { FormHelperText } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const context = useAuthContext();
  const { user, setUser } = context;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);

  useEffect(() => {
    if (user) {
      setInitialValuesState({
        ...initialValues,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      console.log("object", initialValuesState);
    }
    // eslint-disable-next-line
  }, [user]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Required!"),
    lastName: Yup.string().required("Last Name Required!"),
    email: Yup.string().email().required("Email required!"),
    password: Yup.string().min(8),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handlesubmit = async (values) => {
    const password = values.password ? values.password : user.password;
    delete values.password;
    delete values.confirmPassword;
    const updatedVale = {
      ...values,
      password: password,
      id: user.id,
      role: user.role,
      roleId: user.roleId,
    };
    await userService
      .UpdateUser(updatedVale)
      .then((res) => {
        if (res && res.status === 200) {
          setUser(res.data.result);
          toast.success("User Profile Updated!", { position: "bottom-right" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  return (
    <>
      <PageHeading heading="Update Profile" />
      <div
        className="update-profile-page container"
        style={{
          marginTop: 50,
          marginBottom: 80,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <Formik
          initialValues={initialValuesState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => handlesubmit(values)}
        >
          {({ values, setFieldValue, errors, handleBlur }) => {
            return (
              <Form>
                <div className="d-flex" style={{ marginTop: 35 }}>
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="firstName"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      First Name<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      type="text"
                      error={errors.firstName}
                      onBlur={handleBlur}
                      value={values.firstName}
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="firstName"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="lastName"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Last Name<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      type="text"
                      error={errors.lastName}
                      onBlur={handleBlur}
                      value={values.lastName}
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="lastName"></ErrorMessage>
                    </FormHelperText>
                  </div>
                </div>
                <div className="d-flex" style={{ marginTop: 35 }}>
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Email<sup>*</sup>
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
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      New Password<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      error={errors.password}
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
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
                </div>
                <div className="w-50 mx-2" style={{ marginTop: 35 }}>
                  <label
                    htmlFor="confirmPassword"
                    className="form-label"
                    style={{
                      color: "#212121",
                      fontFamily: "'Roboto', sans-serif",
                      margin: "0px auto 15px 0px",
                    }}
                  >
                    Confirm Password<sup>*</sup>
                  </label>
                  <input
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    onChange={(e) =>
                      setFieldValue("confirmPassword", e.target.value)
                    }
                    style={{
                      borderRadius: 0,
                      color: "#212121",
                      fontFamily: "'Roboto', sans-serif",
                      marginBottom: 0,
                    }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="confirmPassword"></ErrorMessage>
                  </FormHelperText>
                </div>
                <div style={{ marginTop: 35, height: 40 }}>
                  <button
                    className="mx-2"
                    type="submit"
                    style={{
                      width: 100,
                      backgroundColor: "#80BF32",
                      color: "white",
                      border: "none",
                      borderRadius: 2,
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="mx-2"
                    style={{
                      width: 100,
                      backgroundColor: "#f14d54",
                      color: "white",
                      border: "none",
                      borderRadius: 2,
                    }}
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default UpdateProfile;
