import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { calculateTotalRating } from "../../../helper/Helpers";
import LazyLoad from "react-lazyload";
import "./PropertyModel.css";

const PropertyModel = ({ property }) => {
  const reviewsLength = property.Reviews?.length || 0;
  const reviews = property.Reviews;
  const totalRating = calculateTotalRating(reviews);
  const discountedPrice = property.discountedPrice;

  return (
    <Link to={`/propertyDetails/${property.id}`} className="property-link">
      <div className="property-container">
        <div className="card">
          <div>
            {property.discount > 0 && (
              <div className="discount-badge">{property.discount}% Off</div>
            )}
            <LazyLoad height={240}>
              <img
                src={`${property.image}`}
                className="card-img-top property-image"
                alt={`${property.name}`}
              />
            </LazyLoad>
          </div>
        </div>
        <div className="property-details">
          <div className="details-header">
            <span className="property-city">{property.city}</span>
            <div className="rating">
              <FontAwesomeIcon icon={faStar} />
              <span className="total-rating">{totalRating.toFixed(2)}</span>
              <span className="rating-count">({reviewsLength})</span>
            </div>
          </div>

          <span className="property-title">{property.title}</span>
          <span className="property-tagline">{property.tagLine}</span>
          <div className="price-details">
            {property.discount > 0 && (
              <div className="original-price-discount">
                ${property.price} night
              </div>
            )}
            {!property.discount > 0 && (
              <span className="original-price">${property.price} night</span>
            )}
            {property.discount > 0 && (
              <span className="discounted-price">${discountedPrice} night</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyModel;
