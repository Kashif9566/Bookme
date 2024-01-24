import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../../../redux/slice/user.slice";
import { useFormik } from "formik";
import api from "../../../api/api";
import "./UpdateCard.css";
import { updateSchemma } from "../../schemas/UserSchema";

const UpdateCard = ({ setShowUpdateCard }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [prevImageURL, setPrevImageURL] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get(`/user/${user.id}`);
        setPrevImageURL(data.image);
        formik.setValues({ username: data.username, email: data.email });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();

    return () => {
      if (prevImageURL) {
        URL.revokeObjectURL(prevImageURL);
      }
    };
  }, [user, prevImageURL]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: updateSchemma,
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const formDataObject = new FormData();
        formDataObject.append("username", values.username);
        formDataObject.append("email", values.email);
        if (formik.values.image) {
          formDataObject.append("image", formik.values.image);
        }

        const response = await api.put(
          `/user/${user.id}/editProfile`,
          formDataObject,
          config
        );

        dispatch(updateUser(response.data));
        setShowUpdateCard(false);
        toast.success("Profile Updated Successfully", { autoClose: 1000 });

        // Reset the form after successful submission
        formik.resetForm();
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
    },
  });

  const handleImageClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrevImageURL(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="card edit-user-info">
      <div className="card-header">Update Profile</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="user-edit-image" onClick={handleImageClick}>
          <img src={prevImageURL} alt="User" />
          <div className="edit-overlay">Edit</div>
        </div>
        <input
          type="file"
          id="imageInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="update-profile-button">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowUpdateCard(false)}
          >
            Cancel
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateCard;
