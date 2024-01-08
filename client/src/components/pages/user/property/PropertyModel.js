import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const PropertyModel = ({ property, reviews, totalRating }) => {
  return (
    <Link
      to={`/propertyDetails/${property.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="d-flex flex-column justify-content-between">
        <div className="card">
          <div>
            <img
              src={`https://bookme-hrs5.onrender.com/${property.image}`}
              className="card-img-top"
              alt={`${property.name}`}
              style={{
                flex: "1",
                objectFit: "cover",
                height: "240px",
              }}
            />
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-between mx-2 mt-2 text-black"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          <span>{property.city}</span>
          <div>
            <FontAwesomeIcon icon={faStar} />
            <span>{totalRating.toFixed(2)}</span>
            <span className="mx-1">({reviews.length})</span>
          </div>
        </div>

        <span className="mx-2" style={{ color: "#727272 " }}>
          {property.title}
        </span>
        <span className="mx-2" style={{ color: "#727272 " }}>
          {property.tagLine}
        </span>
        <span
          className="mx-2 text-black"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          ${property.price} night
        </span>
      </div>
    </Link>
  );
};

export default PropertyModel;
