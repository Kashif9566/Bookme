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
        toast.error("Please provide email and password", { autoClose: 1000 });
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
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-7">
          <h3 style={{ color: "#ff385d", fontSize: "40px" }}>Bookme.com</h3>
          <p>
            Welcome to Bookme!
            <br /> Whether you're a property owner or a traveler,
            <br /> our platform connects you with unique accommodations. <br />
            Find the ideal place for your next adventure.
          </p>
        </div>
        <div className="col-md-4 card p-3">
          <form onSubmit={handleSubmit} className="login-form">
            {["email", "password"].map((field) => (
              <div
                key={field}
                style={{
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <label
                  htmlFor={field}
                  style={{
                    position: "absolute",
                    pointerEvents: "none",
                    left: "10px",
                    top: formData[field] ? "0px" : "50%",
                    transform: formData[field]
                      ? "translateY(0)"
                      : "translateY(-50%)",
                    transition: "top 0.3s, font-size 0.3s",
                    fontSize: formData[field] ? "12px" : "inherit",
                    color: formData[field] ? "#ff385d" : "inherit",
                  }}
                >
                  <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  className="form-control"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    transition: "border-color 0.3s",
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="btn btn-secondary btn-block m-1"
              disabled={loading}
              style={{ backgroundColor: "#ff385d", border: "white" }}
            >
              <b>{loading ? "Logging in..." : "Login"}</b>
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#ff385d",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
