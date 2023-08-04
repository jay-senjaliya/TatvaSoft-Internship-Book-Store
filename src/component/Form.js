import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { ErrorMessage, Formik, Form} from "formik";
import React from "react";
import * as Yup from "yup";

const Form1 = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Reuired!!"),
    email: Yup.string().email('Enter valid email!!').required("Email is Reuired!!"),
    password: Yup.string().min(8, "password must be 8 character!!").required("Password is Reuired!!"),
    age: Yup.number().min(18, "Age must be 18 or greter")
  })

  const handleSubmit = () => {
    console.log("form submitted")
  };

  return (
    <div className="form-div">
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Login Here!
      </Typography>
      {/* Formik started */}
      <Formik
        initialValues={{ name: "", email: "", age: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit()}
      >
        {({ values, errors, handleBlur, setFieldValue }) => {
          console.log("errors:", errors);
          return (
            <Form className="form">
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                error={errors.name}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("name", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="name"></ErrorMessage>
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
                label="Age"
                name="age"
                variant="outlined"
                value={values.age}
                error={errors.age}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("age", e.target.value)}
                style={{ margin: "10px" }}
              />
              <FormHelperText error>
                <ErrorMessage name="age"></ErrorMessage>
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
