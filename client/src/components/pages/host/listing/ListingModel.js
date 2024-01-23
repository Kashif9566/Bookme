import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../api/api";

const ListingModel = ({ property, onPropertyDeleted }) => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const userId = user.id;

  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async (propertyId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.delete(
        `/user/${userId}/property/${propertyId}`,
        config
      );

      if (response) {
        toast.success("Property deleted successfully");
        onPropertyDeleted(propertyId);
      }
    } catch (error) {
      console.error("Error deleting property:", error);

      if (error.response) {
        console.error("Server responded with status:", error.response.status);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }

      toast.error("Error deleting property. See console for details.");
    }
  };

  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      tooltipList.forEach((tooltip) => {
        tooltip.dispose();
      });
    };
  }, [optionsRef]);

  return (
    <div>
      <div className="d-flex flex-column justify-content-between">
        <div className="card position-relative" ref={optionsRef}>
          <div
            className="position-absolute top-0 start-0 m-3"
            style={{ cursor: "pointer" }}
          >
            <span
              className="text-light"
              onClick={() => setShowOptions(!showOptions)}
              style={{ fontSize: "25px", fontWeight: "bold" }}
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Edit your listing"
            >
              &#8942;
            </span>
            {showOptions && (
              <div
                className="bg-light p-2 rounded shadow"
                style={{
                  position: "absolute",
                  top: "0",
                  left: 15,
                  zIndex: 1000,
                }}
              >
                <button className="btn btn-secondary me-2">
                  <Link
                    to={`/hosting/property/${property.id}/editProperty`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Edit
                  </Link>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div>
            <img
              src={`${property.image}`}
              className="card-img-top"
              alt={`${property.name}`}
              style={{
                flex: "1",
                objectFit: "cover",
                height: "310px",
              }}
            />
          </div>
        </div>
        <span style={{ fontWeight: 650, marginTop: "10px" }}>
          {property.title}
        </span>
        <span style={{ color: "#777" }}>
          {property.city}, {property.province}
        </span>
        <Link
          to={`/hosting/property/${property.id}/reservations`}
          className="btn btn-secondary mt-2"
        >
          See Reservations
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListingModel;
