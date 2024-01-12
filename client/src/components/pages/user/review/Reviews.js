import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReviews,
  selectReview,
} from "../../../../redux/slice/review.slice";
import { calculateTotalRating } from "../../../helper/Helpers";
import api from "../../../../api/api";

const Reviews = ({ property }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const token = user.token;
  const propertyId = property.id;
  const dispatch = useDispatch();
  const isSubmitDisabled = !content || !rating;

  useEffect(() => {
    dispatch(fetchReviews({ propertyId }));
  }, [dispatch, propertyId]);

  const reviews = useSelector(selectReview);
  const totalRating = calculateTotalRating(reviews);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(
        `/property/${propertyId}`,
        {
          content,
          rating,
          userId,
        },
        config
      );
      if (response.data) {
        toast.success("Review submitted successfully", { autoClose: 1000 });
        dispatch(fetchReviews({ propertyId }));
        setContent("");
        setRating("");
      } else {
        toast.error("Error sending review", { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending review:", error, { autoClose: 1000 });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h4>
          Overall Rating : {totalRating.toFixed(2)}
          <FontAwesomeIcon icon={faStar} />
        </h4>
        <h5>
          <div> {reviews && reviews.length} Reviews</div>
        </h5>
        <hr />
        <h5>Write your Review</h5>
      </div>

      <div className="row d-flex align-items-center justify-content-center">
        <form className="card col-md-4 m-3 p-2" onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Your Review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="form-control mt-2"
            placeholder="Ratings (1-5)"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-secondary mt-2 mx-4"
            disabled={isSubmitDisabled}
          >
            submit
          </button>
        </form>
      </div>

      <hr />

      {reviews.map((review, index) => (
        <div className="col-md-6 d-flex">
          <div key={index} className="row">
            <div className="d-flex flex-column">
              <div className="mt-4 mb-1 d-flex align-items-center justify-content-start">
                {review.User.image ? (
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={`${api.defaults.baseURL}/${review.User.image}`}
                    alt="User Avatar"
                  />
                ) : (
                  <FontAwesomeIcon className="mx-1" icon={faUser} />
                )}
                <div className="d-flex flex-column">
                  <span style={{ fontWeight: 600, marginLeft: 5 }}>
                    {review.User.username}
                  </span>
                  <span style={{ fontSize: "10px", marginLeft: 5 }}>
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <span>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      style={{ fontSize: "12px" }}
                    />
                  ))}
                </span>
              </div>
              <span>{review.content}</span>
            </div>
          </div>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default Reviews;
