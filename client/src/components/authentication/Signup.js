import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user",
    image: null,
    loading: false,
    showPassword: false,
  });
  const [emailValid, setEmailValid] = useState(true);
  const {
    username,
    email,
    password,
    confirmpassword,
    role,
    image,
    loading,
    showPassword,
  } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password || !confirmpassword) {
        toast.error("Please provide all fields", { autoClose: 1000 });
        return;
      }

      if (password !== confirmpassword) {
        toast.error("Passwords do not match", { autoClose: 1000 });
        return;
      }

      setFormData((prevFormData) => ({ ...prevFormData, loading: true }));

      const form = new FormData();
      form.append("username", username);
      form.append("email", email);
      form.append("password", password);
      form.append("role", role);
      form.append("image", image);

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await api.post("/user/register", form, config);

      if (response.status === 201) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
          role: "user",
          image: null,
          loading: false,
        });
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
    } finally {
      setFormData((prevFormData) => ({ ...prevFormData, loading: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
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
          <form onSubmit={handleSubmit} className="signup-form">
            {["username", "email", "password", "confirmpassword", "role"].map(
              (field) => (
                <div key={field} className="form-group  mx-2">
                  <label htmlFor={field} className="form-label">
                    <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
                    {field === "email" && email && (
                      <div
                        style={{
                          color: emailValid ? "green" : "red",
                          fontSize: "14px",
                          marginTop: "5px",
                        }}
                      >
                        {emailValid
                          ? "Correct email format"
                          : "Incorrect email format"}
                      </div>
                    )}
                  </label>

                  {field === "role" ? (
                    <select
                      className="form-control"
                      id={field}
                      name={field}
                      value={role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="host">Host</option>
                    </select>
                  ) : (
                    <div className="input-group">
                      <input
                        type={
                          field.includes("password") && !showPassword
                            ? "password"
                            : "text"
                        }
                        className="form-control"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                      {field.includes("password") && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      )}
                    </div>
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
                onChange={handleChange}
                className="input mx-1"
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-block my-2 mx-2"
              disabled={loading}
              style={{ backgroundColor: "#ff385d", border: "white" }}
            >
              {loading ? "Signing up..." : <b>Signup</b>}
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
