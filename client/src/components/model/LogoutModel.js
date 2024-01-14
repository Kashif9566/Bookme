import React from "react";
import "./LogoutModel.css";
const LogoutModel = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Are you sure you want to logout?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutModel;
