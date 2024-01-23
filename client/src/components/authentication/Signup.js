import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validationSchema } from "../schemas/UserSchema";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "user",
      image: null,
      showPassword: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      values.isSubmitting = true;
      try {
        if (values.password !== values.confirmpassword) {
          toast.error("Passwords do not match", { autoClose: 1000 });
          return;
        }

        const form = new FormData();
        form.append("username", values.username);
        form.append("email", values.email);
        form.append("password", values.password);
        form.append("role", values.role);
        if (values.image) {
          form.append("image", values.image);
        } else {
          form.append("image", "");
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await api.post("/user/register", form, config);

        if (response.status === 201) {
          toast.success("Account created successfully!", { autoClose: 1000 });
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("User already exists", { autoClose: 1000 });
        } else {
          console.error(error);
          toast.error("Error creating Account", { autoClose: 1000 });
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-7">
          <h3 style={{ color: "#ff385d", fontSize: "50px" }}>Bookme.com</h3>
          <p>
            Welcome to Bookme!
            <br /> Whether you're a property owner or a traveler,
            <br /> our platform connects you with unique accommodations. <br />
            Find the ideal place for your next adventure.
          </p>
        </div>
        <div className="col-md-5 card p-3">
          <form onSubmit={formik.handleSubmit} className="signup-form">
            {["username", "email", "password", "confirmpassword", "role"].map(
              (field) => (
                <div key={field} className="form-group  mx-2">
                  <label htmlFor={field} className="form-label">
                    <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
                    {field === "email" && formik.values.email && (
                      <div
                        style={{
                          color: formik.errors.email ? "red" : "green",
                          fontSize: "14px",
                          marginTop: "5px",
                        }}
                      >
                        {formik.errors.email || "Correct email format"}
                      </div>
                    )}
                  </label>

                  {field === "role" ? (
                    <select
                      className="form-control"
                      id={field}
                      name={field}
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="user">User</option>
                      <option value="host">Host</option>
                    </select>
                  ) : (
                    <div className="input-groups d-flex">
                      <input
                        type={
                          field.includes("password") &&
                          !formik.values.showPassword
                            ? "password"
                            : "text"
                        }
                        className="form-control"
                        id={field}
                        name={field}
                        value={formik.values[field] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {field.includes("password") && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={
                              formik.values.showPassword ? faEyeSlash : faEye
                            }
                          />
                        </button>
                      )}
                    </div>
                  )}
                  {formik.touched[field] && formik.errors[field] && (
                    <div className="error-message">{formik.errors[field]}</div>
                  )}
                </div>
              )
            )}
            <div className="form-group my-2 mx-2">
              <label htmlFor="image" className="form-label">
                <b>Image</b>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue(
                    "image",
                    event.currentTarget.files.length > 0
                      ? event.currentTarget.files[0]
                      : undefined
                  );
                }}
                className="input mx-1"
                value=""
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-block my-2 mx-2"
              style={{ backgroundColor: "#ff385d", border: "white" }}
            >
              {formik.isSubmitting ? "Signing up..." : <b>Signup</b>}
            </button>
          </form>
          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "#333",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#ff385d",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login
            </Link>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
