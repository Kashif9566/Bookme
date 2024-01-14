import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertyById,
  selectSingleProperty,
} from "../../../../redux/slice/property.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faHome,
  faShower,
  faLocation,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import Reviews from "../review/Reviews";
import { selectReview } from "../../../../redux/slice/review.slice";
import {
  formatDate,
  calculateTotalRating,
  getDefaultDates,
  calculateNumNights,
} from "../../../helper/Helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../Nav";
import Loader from "../../../Loader";
import api from "../../../../api/api";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReview);
  const isLoading = useSelector((state) => state.property.isLoading);
  const user = useSelector((state) => state.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchPropertyById({ propertyId }));
  }, [dispatch, propertyId]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [numNights, setNumNights] = useState(1);

  useEffect(() => {
    const { checkIn, checkOut } = getDefaultDates();
    setCheckIn(checkIn);
    setCheckOut(checkOut);
  }, []);

  const property = useSelector(selectSingleProperty);
  const totalRating = calculateTotalRating(reviews);
  const calculatedNumNights = calculateNumNights(checkIn, checkOut);

  if (!property) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!property.price) {
    return <div>Error: Property price is not available.</div>;
  }
  const totalPrice = Number(property.price) * calculatedNumNights;
  const serviceFee = 0.1 * totalPrice;
  const totalWithServiceFee = totalPrice + serviceFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await api.post(
        `/user/${userId}/property/${propertyId}/reservation`,
        { checkIn, checkOut, propertyId, userId },
        config
      );
      if (data) {
        setCheckIn("");
        setCheckOut("");
        setGuests("");
        toast.success(
          "You request to reservation has submitted successfully!",
          { autoClose: 1000 }
        );
      } else {
        toast.error("Error requesting reservation", { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error requesting reservation:", error, { autoClose: 1000 });
    }
  };
  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <Nav />
            {property && (
              <div className="container">
                <div className="row">
                  <img
                    src={`${property.image}`}
                    className="card-img-top col-md-11 my-5"
                    alt={`${property.name}`}
                    style={{
                      flex: "1",
                      objectFit: "cover",
                      height: "240px",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="d-flex flex-column mb-4">
                      <span
                        style={{ fontSize: "20px", fontWeight: 600 }}
                      >{`Room in ${property.city}, ${property.province}`}</span>
                      <span style={{ color: "#777777" }}>
                        Double bed, Private attached bathroom
                      </span>
                      <div className="d-flex align-items-center">
                        Rating: {totalRating.toFixed(2)}
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                      <span>Reviews: {reviews.length}</span>
                    </div>
                    <hr />
                    <div className="my-4 d-flex align-items-center justify-content-start">
                      <div>
                        {property.User.image ? (
                          <img
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "50%",
                            }}
                            src={`${property.User.image}`}
                            alt={`${property.User.username}`}
                          />
                        ) : (
                          <FontAwesomeIcon className="mx-1" icon={faUser} />
                        )}
                      </div>
                      <span style={{ fontWeight: 600, marginLeft: 5 }}>
                        Hosted by {property.User.username}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center my-2">
                      <FontAwesomeIcon icon={faHome} />
                      <div className="mx-3 d-flex flex-column">
                        <span style={{ fontSize: "18px", fontWeight: 600 }}>
                          Room in a villa
                        </span>
                        <span style={{ color: "#999999" }}>
                          Your own room in a home, plus access to shared spaces.
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center my-2">
                      <FontAwesomeIcon icon={faShower} />
                      <div className="mx-3 d-flex flex-column">
                        <span style={{ fontSize: "18px", fontWeight: 600 }}>
                          Private attached bathroom
                        </span>
                        <span style={{ color: "#999999" }}>
                          This place has a bathroom that’s connected to your
                          room.
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faLocation} />
                      <div className="mx-3 d-flex flex-column">
                        <span style={{ fontSize: "18px", fontWeight: 600 }}>
                          Great location
                        </span>
                        <span style={{ color: "#999999" }}>
                          92% of recent guests gave the location a 5-star
                          rating.
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h4 className="my-4">Meet your host</h4>
                      <div
                        className="card p-2"
                        style={{
                          backgroundColor: "#f0efe9 ",
                          borderRadius: "15px",
                        }}
                      >
                        <div>
                          <div className="card shadow d-flex flex-column flex-md-row align-items-center mx-5 justify-content-center">
                            <div className="d-flex flex-column align-items-center">
                              <img
                                src={`${property.User.image}`}
                                className="card-img-top rounded-circle"
                                alt={`${property.User.username}`}
                                style={{
                                  height: "150px",
                                  width: "150px",
                                  margin: "10px",
                                  border: "4px solid #fff",
                                }}
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span
                                  style={{ fontSize: "30px", fontWeight: 500 }}
                                >
                                  {property.User.username}
                                </span>
                                <span>Host</span>
                              </div>
                            </div>

                            <div className="d-flex flex-column p-3">
                              <span
                                style={{ fontSize: "20px", fontWeight: 600 }}
                              >
                                {reviews && reviews.length}
                              </span>
                              <span>Reviews</span>
                              <hr />
                              <span
                                style={{ fontSize: "20px", fontWeight: 600 }}
                              >
                                {totalRating.toFixed(2)}
                                <FontAwesomeIcon icon={faStar} />
                              </span>
                              <span>Rating</span>
                              <hr />
                              <span
                                style={{ fontSize: "20px", fontWeight: 600 }}
                              >
                                {formatDate(property.createdAt)}
                              </span>
                              <span>of Hosting</span>
                            </div>
                          </div>

                          <div
                            className="d-flex flex-column"
                            style={{ margin: "30px 100px 10px 100px" }}
                          >
                            <span>
                              Hi I'm {property.User.username}, im a host
                              .Hospitality is my passion.and it will be great
                              honor for me to serve my guests with comfortable
                              stay
                            </span>

                            <hr />
                            <span style={{ fontSize: "12px" }}>
                              To protect your payment, never transfer money or
                              communicate outside of the Bookme website or app.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h4 className="my-4">About this place</h4>
                        <p>
                          {property.description.length > 500
                            ? `${property.description.slice(0, 500)}...`
                            : property.description}
                        </p>
                        <h5>Other things to note</h5>
                        <div className="d-flex flex-column">
                          <span> no drugs🚫</span>
                          <span>music not allowed 🚫 </span>
                          <span>Alcohol is alsoprohibited 🚫</span>
                        </div>
                        <hr />
                      </div>
                      <div className="my-3">
                        <h4>Where you'll sleep</h4>
                        <div
                          className="d-flex flex-column align-items-start"
                          style={{
                            border: "1px solid",
                            padding: "10px 30px 10px 30px",
                            width: "fit-content",
                            display: "inline - block",
                            borderRadius: "20px",
                          }}
                        >
                          <FontAwesomeIcon className="mx-1 my-3" icon={faBed} />
                          <span style={{ fontWeight: 600 }}>Bedroom</span>
                          <span style={{ fontSize: "13px" }}>1 Double bed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="card p-3">
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                          margin: "3px 10px 3px ",
                        }}
                      >
                        $ {property.price}{" "}
                        <span style={{ fontSize: "14px", fontWeight: 300 }}>
                          night
                        </span>
                      </span>
                      <form className="card m-2" onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center justify-content-between mx-4 mt-3">
                          <div>
                            <label>
                              <b>Check-in</b>
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              value={checkIn}
                              onChange={(e) => {
                                setCheckIn(e.target.value);
                                const newNumNights = calculateNumNights(
                                  e.target.value,
                                  checkOut
                                );
                                setNumNights(newNumNights);
                              }}
                            />
                          </div>
                          <div>
                            <label>
                              <b>CheckOut</b>
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              value={checkOut}
                              onChange={(e) => {
                                setCheckOut(e.target.value);
                                const newNumNights = calculateNumNights(
                                  checkIn,
                                  e.target.value
                                );
                                setNumNights(newNumNights);
                              }}
                            />
                          </div>
                        </div>
                        <hr />

                        <div className="mx-4 mb-3">
                          <label>
                            <b>Guests</b>
                          </label>
                          <input
                            className="form-control mt-2"
                            type="number"
                            min="0"
                            pattern="\d+"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                          />
                        </div>
                        <button
                          className="btn btn-primary mx-2 p-2 mb-2"
                          type="submit"
                        >
                          Reserve
                        </button>
                      </form>
                      <div className="d-flex align-items-center justify-content-between mx-2">
                        <span>
                          Price for {numNights} night
                          {numNights === 1 ? "" : "s"}
                        </span>

                        <span>${totalPrice}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mx-2">
                        <span>Service fee</span>
                        <span>${serviceFee.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div
                        className="d-flex align-items-center justify-content-between mx-2"
                        style={{ fontSize: "22px", fontWeight: 550 }}
                      >
                        <span>Total</span>
                        <span>${totalWithServiceFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <Reviews property={property} />
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
