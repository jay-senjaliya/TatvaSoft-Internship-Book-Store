import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { ErrorMessage, Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Form1 = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Reuired!!"),
    lastName: Yup.string().required("Last Name is Reuired!!"),
    email: Yup.string()
      .email("Enter valid email!!")
      .required("Email is Reuired!!"),
    password: Yup.string()
      .min(8, "password must be 8 character!!")
      .required("Password is Reuired!!"),
    roleId: Yup.number()
      .min(1, "role ID must be positive.")
      .required("Role ID is Reuired!!"),
  });

  const handleSubmit = async (values) => {
    await axios
      .post("https://book-e-sell-node-api.vercel.app/api/user", values)
      .then((res) => {
        // console.log(res.data);
        toast.success("User Registered Successfully!", "bottom-right");
      })
      .catch((err) => {
        toast.error("User Not Register!!", "bottom-right");
        // console.log(err);
      });

    // console.log(values);
    // await authService
    //   .Register(values)
    //   .then((res) => {
    //     console.log(res);
    //     toast.success("User Registered Successfully!", "botttom-right");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="form-div">
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Login Here!
      </Typography>
      {/* Formik started */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          roleId: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, handleBlur, setFieldValue }) => {
          // console.log("errors:", errors);
          return (
            <Form className="form">
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                value={values.firstName}
                error={errors.firstName}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("firstName", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="firstName"></ErrorMessage>
              </FormHelperText>
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                value={values.lastName}
                error={errors.lastName}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("lastName", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="lastName"></ErrorMessage>
              </FormHelperText>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                value={values.email}
                error={errors.email}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("email", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="email"></ErrorMessage>
              </FormHelperText>
              <TextField
                label="Role ID"
                name="roleId"
                variant="outlined"
                value={values.roleId}
                error={errors.roleId}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("roleId", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="roleId"></ErrorMessage>
              </FormHelperText>
              <TextField
                label="Password"
                name="password"
                variant="outlined"
                value={values.password}
                error={errors.password}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("password", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="password"></ErrorMessage>
              </FormHelperText>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
      {/* Formik End */}
    </div>
  );
};

export default Form1;
