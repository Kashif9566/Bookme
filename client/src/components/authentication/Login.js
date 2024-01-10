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

  const [loading, setLoading] = useState(false);

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

      setLoading(true);

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
        toast.success("Login Successful", { autoClose: 1000 });
        navigate("/hosting");
      } else {
        navigate("/home");
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User does not exist", { autoClose: 1000 });
        } else if (error.response.status === 401) {
          toast.error("Incorrect password", { autoClose: 1000 });
        } else {
          console.error(error);
          toast.error("Error signing in", { autoClose: 1000 });
        }
      } else {
        console.error(error);
        toast.error("Error signing in", { autoClose: 1000 });
      }
    } finally {
      setLoading(false);
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
        <button
          type="submit"
          className="btn btn-secondary btn-block my-3"
          disabled={loading}
        >
          <b>{loading ? "Logging in..." : "Login"}</b>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
