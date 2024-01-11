import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { calculateTotalRating } from "../../../helper/Helpers";
import api from "../../../../api/api";
import LazyLoad from "react-lazyload";

const PropertyModel = ({ property }) => {
  const reviewsLength = property.Reviews.length;
  const reviews = property.Reviews;
  const totalRating = calculateTotalRating(reviews);

  return (
    <Link
      to={`/propertyDetails/${property.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="d-flex flex-column justify-content-between">
        <div className="card">
          <div>
            <LazyLoad height={240}>
              <img
                src={`${api.defaults.baseURL}/${property.image}`}
                className="card-img-top"
                alt={`${property.name}`}
                style={{
                  flex: "1",
                  objectFit: "cover",
                  height: "240px",
                }}
              />
            </LazyLoad>
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
            <span className="mx-1">({reviewsLength})</span>
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
