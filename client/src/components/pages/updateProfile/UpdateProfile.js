import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../host/layout/Nav";
import UserNav from "../user/layout/UserNav";
import { updateUser } from "../../../redux/slice/user.slice";
import "./UpdateProfile.css";
import ChangePasswordCard from "./ChangePasswordCard";
import UpdateCard from "./UpdateCard";
import api from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const avatarSrc = `https://ui-avatars.com/api/?name=${user?.username}&size=40`;
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const renderNavbar = () => {
    if (user.role === "host") {
      return <Nav />;
    } else if (user.role === "user") {
      return <UserNav />;
    }
    return null;
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file || !user.image) {
      try {
        const formData = new FormData();
        formData.append("image", file || avatarSrc);
        const response = await api.put(`/user/${user.id}/image`, formData);
        console.log("Image Update Response:", response);
        if (response) {
          dispatch(updateUser(response.data));
          toast.success("Image updated successfully", { autoClose: 1000 });
        } else {
          toast.error("Error updating image", { autoClose: 1000 });
        }
      } catch (error) {
        console.error("Error updating image", error);
        toast.error("Error updating image", { autoClose: 1000 });
      }
    }
  };

  return (
    <div className="row">
      {renderNavbar()}
      <div className="col-md-12">
        <div className="profile">
          {user.image ? (
            <div className="update-profile-image" onClick={handleEditClick}>
              <img src={user.image} alt="Profile" />
              <div className="edit-overlay-update">Edit</div>
            </div>
          ) : (
            <div className="update-profile-image" onClick={handleEditClick}>
              <img className="avatar" src={avatarSrc} alt="Default Avatar" />
              <div className="edit-overlay-update">Edit</div>
            </div>
          )}

          <input
            type="file"
            id="imageInput"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <h2>{user.username}</h2>
          <h4>{user.email}</h4>
          {showChangePasswordForm && (
            <ChangePasswordCard
              setShowChangePasswordForm={setShowChangePasswordForm}
            />
          )}
          <button
            className="btn btn-primary"
            onClick={() => setShowChangePasswordForm(true)}
          >
            Change Password
          </button>
          {showUpdateCard && (
            <UpdateCard setShowUpdateCard={setShowUpdateCard} />
          )}
          <button
            className="btn btn-primary"
            onClick={() => setShowUpdateCard(true)}
          >
            Update Profile
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
