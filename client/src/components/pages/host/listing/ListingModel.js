import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../api/api";

const ListingModel = ({ property, onPropertyDeleted }) => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const userId = user.id;
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

  return (
    <div>
      <div className="d-flex flex-column justify-content-between">
        <div className="card">
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

        <button
          className="btn btn-danger mt-1 mb-5"
          onClick={() => handleDelete(property.id)}
        >
          Delete Listing
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListingModel;
