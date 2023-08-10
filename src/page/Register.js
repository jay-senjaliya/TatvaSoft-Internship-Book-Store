import React from "react";
import Breadcrumb from "../component/Breadcrumb";
import PageHeding from "../component/PageHeding";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb value="Create an Account" />
      <PageHeding heading="Login or Create an Account" />
      <div
        className="container"
        style={{ marginTop: 50, fontFamily: "'Roboto', sans-serif" }}
      >
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
                name="firstName"
                // error={errors.email}
                // onBlur={handleBlur}
                // value={values.email}
                // onChange={(e) => setFieldValue("email", e.target.value)}
                style={{
                  height: 40,
                  borderRadius: 0,
                  color: "#212121",
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: 15,
                }}
              />
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
                // error={errors.email}
                // onBlur={handleBlur}
                // value={values.email}
                // onChange={(e) => setFieldValue("email", e.target.value)}
                style={{
                  borderRadius: 0,
                  color: "#212121",
                  height: 40,
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: 15,
                }}
              />
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
            // error={errors.email}
            // onBlur={handleBlur}
            // value={values.email}
            // onChange={(e) => setFieldValue("email", e.target.value)}
            style={{
              borderRadius: 0,
              height: 40,
              color: "#212121",
              fontFamily: "'Roboto', sans-serif",
              marginTop: 15,
            }}
          />
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
                id="password"
                name="password"
                // error={errors.email}
                // onBlur={handleBlur}
                // value={values.email}
                // onChange={(e) => setFieldValue("email", e.target.value)}
                style={{
                  height: 40,
                  borderRadius: 0,
                  color: "#212121",
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: 15,
                }}
              />
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
                id="confirmPassword"
                name="confirmPassword"
                // error={errors.email}
                // onBlur={handleBlur}
                // value={values.email}
                // onChange={(e) => setFieldValue("email", e.target.value)}
                style={{
                  borderRadius: 0,
                  color: "#212121",
                  height: 40,
                  fontFamily: "'Roboto', sans-serif",
                  marginTop: 15,
                }}
              />
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
            onClick={() => navigate("/login")}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
