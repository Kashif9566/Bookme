import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please provide email and password");
        return;
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await api.post(
        "/user/login",
        { email, password },
        config
      );

      const { role } = data;
      if (role === "host") {
        navigate("/hosting");
      } else {
        navigate("/home");
      }

      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      toast.error("Error signing in");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="login-form">
        {["email", "password"].map((field) => (
          <div key={field} className="form-group" style={{ width: "250px" }}>
            <label htmlFor={field} className="form-label">
              <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-secondary btn-block my-3">
          <b>Login</b>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
