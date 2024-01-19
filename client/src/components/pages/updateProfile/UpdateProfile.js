import React, { useState } from "react";
import Nav from "../host/layout/Nav";
import UserNav from "../user/layout/UserNav";
import { useSelector } from "react-redux";
import "./UpdateProfile.css";
import ChangePasswordCard from "./ChangePasswordCard";
import UpdateCard from "./UpdateCard";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const avatarSrc = `https://ui-avatars.com/api/?name=${user?.username}&size=40`;
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showUpdateCard, setShowUpdateCard] = useState(false);

  const renderNavbar = () => {
    if (user.role === "host") {
      return <Nav />;
    } else if (user.role === "user") {
      return <UserNav />;
    }
    return null;
  };

  return (
    <div className="row">
      {renderNavbar()}
      <div className="col-md-12">
        <div className="profile">
          {user.image ? (
            <img src={user.image} alt="Profile" />
          ) : (
            <img src={avatarSrc} alt="Default Avatar" />
          )}

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
    </div>
  );
};

export default UpdateProfile;
