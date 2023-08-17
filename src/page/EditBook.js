import React, { useEffect, useState } from "react";
import PageHeading from "../component/PageHeading";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import categoryService from "../services/categoryService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookService from "../services/bookService";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialValues = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    base64image: "",
    categoryId: 0,
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (id) {
      GetBook();
    }
    categoryService.GetAllCategory().then((res) => {
      if (res && res.status === 200) {
        setCategories(res.data.result);
      }
    });
    // eslint-disable-next-line
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name Required!"),
    price: Yup.number().min(0).required("Book Price Required!"),
    categoryId: Yup.string().required("Category Required!"),
    description: Yup.string().required("Description Required!"),
    base64image: Yup.string().required("Image is required"),
  });

  const GetBook = async () => {
    await bookService.GetBookById(id).then((res) => {
      if (res && res.status === 200) {
        // setBook(res.data.result);
        // console.log("object", res.data.result);
        const book = res.data.result;
        // console.log("object", book);
        setInitialValuesState({
          id: book.id,
          name: book.name,
          price: book.price,
          description: book.description,
          base64image: book.base64image,
          categoryId: book.categoryId,
        });
      }
    });
  };

  const handleUpload = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const selectedFile = files[0];
      const fileNameArray = selectedFile.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (selectedFile.size > 10000) {
          setFieldError("base64image", "File size must be less than 10kb!");
          // toast.error("File size must be less than 50kb!");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = (err) => {
          throw err;
        };
      } else {
        // toast.error("only jpg, png and jpeg files are allowed!");
        setFieldError(
          "base64image",
          "only jpg, png and jpeg files are allowed!"
        );
      }
    } else {
      setFieldValue("base64image", "");
    }
  };

  const handleSave = async (values) => {
    await bookService
      .Save(values)
      .then((res) => {
        if (res && res.status === 200) {
          toast.success("Book Added Successfully!", {
            position: "bottom-right",
          });
          navigate("/books");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };
  // console.log("category", categories);

  const handleUpdate = async (values) => {
    // console.log("object", initialValuesState);

    await bookService
      .UpdateBook(values)
      .then((res) => {
        if (res && res.status === 200) {
          toast.success("Record updated successfully!", {
            position: "bottom-right",
          });
          navigate("/books");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error, { position: "bottom-right" });
      });
  };

  return (
    <>
      <PageHeading heading={id ? "Edit Book" : "Add Book"} />
      <div
        className="edit-add-book container"
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
                      Book Name<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
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
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="price"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Book Price(RS)<sup>*</sup>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="price"
                      name="price"
                      error={errors.price}
                      onBlur={handleBlur}
                      value={values.price}
                      onChange={(e) => setFieldValue("price", e.target.value)}
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="price"></ErrorMessage>
                    </FormHelperText>
                  </div>
                </div>
                <div className="d-flex" style={{ marginTop: 35 }}>
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="category"
                      className="form-label"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Category<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="category"
                      name="categoryId"
                      error={errors.categoryId}
                      onBlur={handleBlur}
                      value={values.categoryId}
                      onChange={(e) =>
                        setFieldValue("categoryId", e.target.value)
                      }
                      style={{
                        borderRadius: 0,
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 0,
                      }}
                    >
                      <option value="" hidden></option>
                      {categories?.map((category) => {
                        return (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    <FormHelperText error>
                      <ErrorMessage name="categoryId"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  <div className="w-50 mx-2">
                    <label
                      htmlFor="base64image"
                      className="form-label form-label-file"
                      style={{
                        color: "#212121",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0px auto 15px 0px",
                      }}
                    >
                      Select Image<sup>*</sup>
                    </label>
                    {!values.base64image && (
                      <>
                        <div className="input-group">
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            id="base64image"
                            name="base64image"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            // error={errors.base64image}
                            onBlur={handleBlur}
                            // value={values.base64image}
                            onChange={(e) =>
                              handleUpload(e, setFieldValue, setFieldError)
                            }
                            style={{
                              borderRadius: 0,
                              color: "#212121",
                              fontFamily: "'Roboto', sans-serif",
                              marginBottom: 0,
                            }}
                          />
                        </div>
                      </>
                    )}

                    {values.base64image && (
                      <>
                        <div
                          className="uploaded-img"
                          style={{ color: "#212121" }}
                        >
                          <em>
                            <img
                              src={values.base64image}
                              alt=""
                              style={{ height: 35 }}
                            ></img>
                          </em>{" "}
                          Image{" "}
                          <button
                            className="btn"
                            style={{ color: "#212121", fontWeight: 800 }}
                            onClick={() => setFieldValue("base64image", "")}
                          >
                            X
                          </button>
                        </div>
                      </>
                    )}

                    <FormHelperText error>
                      <ErrorMessage name="base64image"></ErrorMessage>
                    </FormHelperText>
                  </div>
                </div>
                <div className="w-100 mx-2" style={{ marginTop: 35 }}>
                  <label
                    htmlFor="description"
                    className="form-label"
                    style={{
                      color: "#212121",
                      fontFamily: "'Roboto', sans-serif",
                      margin: "0px auto 15px 0px",
                    }}
                  >
                    Description<sup>*</sup>
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    id="description"
                    name="description"
                    error={errors.description}
                    onBlur={handleBlur}
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    style={{
                      borderRadius: 0,
                      color: "#212121",
                      fontFamily: "'Roboto', sans-serif",
                      marginBottom: 0,
                    }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="description"></ErrorMessage>
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
                    onClick={() => navigate("/books")}
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

export default EditBook;
