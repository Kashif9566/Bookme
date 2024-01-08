import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProperty,
  fetchProperty,
  selectSearchProperty,
} from "../../../../redux/slice/property.slice";
import PropertyModel from "./PropertyModel";
import {
  fetchReviews,
  selectReview,
} from "../../../../redux/slice/review.slice";
import { calculateTotalRating } from "../../../helper/Helpers";
import Loader from "../../../Loader";

const Properties = () => {
  const properties = useSelector(selectProperty);
  const searchResult = useSelector(selectSearchProperty);
  const isLoading = useSelector((state) => state.property.isLoading);
  const dispatch = useDispatch();
  const [firstEffectCompleted, setFirstEffectCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchProperty())
      .then(() => {
        setFirstEffectCompleted(true);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const fetchReviewsPromises = properties.map((property) =>
          dispatch(fetchReviews({ propertyId: property.id }))
        );
        await Promise.all(fetchReviewsPromises);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (firstEffectCompleted) {
      fetchAllReviews();
    }
  }, [dispatch, firstEffectCompleted, properties]);

  const reviews = useSelector(selectReview);

  const totalRating = calculateTotalRating(reviews);

  const filteredProperties = searchResult ? searchResult : properties;

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="row">
          {filteredProperties.map((property) => (
            <div key={property.id} className="col-md-3 mt-3">
              <PropertyModel
                property={property}
                reviews={reviews}
                totalRating={totalRating}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
