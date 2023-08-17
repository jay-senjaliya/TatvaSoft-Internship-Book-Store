import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import categoryService from "../services/categoryService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialValues = {
    id: 0,
    name: "",
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (id) {
      GetCategory();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (category) {
      setInitialValuesState({
        id: category.id,
        name: category.name,
      });
    }
    // eslint-disable-next-line
  }, [category]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name Required!"),
  });

  const GetCategory = async () => {
    await categoryService.GetCategoryById(id).then((res) => {
      if (res && res.status === 200) {
        setCategory(res.data.result);
      }
    });
  };

  const handleUpdate = async (values) => {
    await categoryService
      .UpdateCategory(values)
      .then((res) => {
        if (res && res.status === 200) {
          toast.success("Category Updated Successfully!", {
            position: "bottom-right",
          });
          navigate("/category");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  const handleSave = async (values) => {
    delete values.id;
    await categoryService
      .Save(values)
      .then((res) => {
        if (res && res.status === 200) {
          toast.success("Category Created Successfully!", {
            position: "bottom-right",
          });
          navigate("/category");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };
  return (
    <>
      <PageHeading heading={id ? "Edit Category" : "Add Category"} />
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
          onSubmit={(values) => {
            if (id) {
              handleUpdate(values);
            } else {
              handleSave(values);
            }
          }}
        >
          {({ values, handleBlur, errors, setFieldValue, setFieldError }) => {
            return (
              <Form>
                <div className="d-flex">
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="name"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Name<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      type="text"
                      error={errors.name}
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="name"></ErrorMessage>
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
                    onClick={() => navigate("/category")}
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

export default EditCategory;
