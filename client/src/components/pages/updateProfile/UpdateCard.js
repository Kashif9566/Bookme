import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../../redux/slice/user.slice";

const UpdateCard = ({ setShowUpdateCard }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      const response = await api.put(`/user/${user.id}/editProfile`, formData);
      dispatch(setUser(response.data));
      setShowUpdateCard(false);
      toast.success("Profile Updated Successfully", { autoClose: 1000 });
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile. Please try again", {
        autoClose: 1000,
      });
      if (error.response.status === 404) {
        toast.error("User not found", { autoClose: 1000 });
      } else if (error.response.status === 400) {
        toast.error("Email is already in use", { autoClose: 1000 });
      }
    }
  };

  const handleCancel = () => {
    setShowUpdateCard(false);
  };

  return (
    <div className="card ">
      <div className="card-header">Update Profile</div>
      <div className="update-card d-flex">
        <form onSubmit={handleSubmit}>
          <div className="update-profile-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="update-profile-button">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCard;
