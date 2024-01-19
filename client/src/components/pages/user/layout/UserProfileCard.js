import React, { useState } from "react";
import "./UserProfileCard.css";
import LogoutModel from "../../../model/LogoutModel";
import { Link } from "react-router-dom";

const UserProfileCard = ({
  user,
  avatarSrc,
  handleLogout,
  handleUpdateProfile,
}) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div className="card profile-card">
      {user.image ? (
        <img
          src={`${user.image}`}
          alt={`Profile of ${user.username}`}
          className="profile-image"
        />
      ) : (
        <img
          src={avatarSrc}
          alt="Profile Avatar"
          className="avatar-image"
          onClick={handleUpdateProfile}
        />
      )}
      <p className="profile-name">{user?.username}</p>
      <p className="profile-email">{user?.email}</p>
      <hr className="profile-border" />
      <ul className="profile-actions">
        <Link to={"/updateProfile"} className="update-profile-btn">
          Update Profile
        </Link>
        <li onClick={openLogoutModal}>Logout</li>
      </ul>
      <LogoutModel
        isOpen={isLogoutModalOpen}
        onCancel={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default UserProfileCard;
