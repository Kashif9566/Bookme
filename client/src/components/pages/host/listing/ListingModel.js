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
        withCredentials: true,
      };
      const response = await api.delete(
        `/user/${userId}/property/${propertyId}`,
        config
      );
      if (response) {
        toast.success("property deleted sucessfully");
        onPropertyDeleted(propertyId);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property: " + error.message);
    }
  };
  return (
    <div>
      <div className="d-flex flex-column justify-content-between">
        <div className="card">
          <div>
            <img
              src={`https://bookme-k9xo.onrender.com/${property.image}`}
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
