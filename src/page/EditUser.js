import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../services/userService";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialValues = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const [roles, setRoles] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) {
      GetUser();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (user && roles.length) {
      const roleId = roles.find((role) => role.name === user?.role)?.id;
      setInitialValuesState({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roleId,
        password: user.password,
      });
    }
  }, [user, roles]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Required!"),
    lastName: Yup.string().min(0).required("Last Name Required!"),
    email: Yup.string().email().required("Email Required!"),
    roleId: Yup.number().required("Select Role"),
  });

  const getRoles = async () => {
    await userService.GetAllRoles().then((res) => {
      if (res && res.status === 200) {
        setRoles(res.data.result);
        console.log("object", roles);
      }
    });
  };

  const GetUser = async () => {
    await userService.GetUserById(id).then((res) => {
      if (res && res.status === 200) {
        setUser(res.data.result);
      }
    });
  };

  const handleUpdate = async (values) => {
    const updatedValue = {
      ...values,
      role: roles.find((r) => r.id === values.roleId).name,
    };
    await userService
      .UpdateUser(updatedValue)
      .then((res) => {
        if (res && res.status === 200) {
          toast.success("User Updated Successfully!", {
            position: "bottom-right",
          });
          navigate("/users");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  return (
    <>
      <PageHeading heading={id ? "Edit User" : "Add User"} />
      <div
        className="edit-add-user container"
        style={{
          marginTop: 50,
          fontFamily: "'Roboto', sans-serif",
          color: "#838383",
          marginBottom: 80,
        }}
      >
        <Formik
          initialValues={initialValuesState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => handleUpdate(values)}
        >
          {({ values, handleBlur, errors, setFieldValue, setFieldError }) => {
            return (
              <Form>
                <div className="d-flex">
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
                      type="text"
                      name="email"
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
                      htmlFor="roleId"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Role<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="roleId"
                      name="roleId"
                      error={errors.roleId}
                      onBlur={handleBlur}
                      value={values.roleId}
                      onChange={(e) => setFieldValue("roleId", e.target.value)}
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    >
                      <option value="" hidden></option>
                      {roles?.map((role) => {
                        return (
                          <option value={role.id} key={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                    </select>
                    <FormHelperText error>
                      <ErrorMessage name="roleId"></ErrorMessage>
                    </FormHelperText>
                  </div>
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
                    onClick={() => navigate("/users")}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EditUser;
