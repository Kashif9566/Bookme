import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../../Loader";
import Nav from "../layout/UserNav";
import api from "../../../../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const token = user.token;

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchReservations = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/user/${userId}/reservation`, config);
      setReservations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const cancelReservation = async (reservationId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.delete(
        `/user/${userId}/reservation/${reservationId}`,
        config
      );
      if (response.status === 200) {
        toast.success("Reservation Cancelled", { autoClose: 1000 });
        fetchReservations();
        setShowModal(false); // Close the modal after successful cancellation
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-12">
            <Nav />
            <div className="container">
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h3>My Bookings</h3>
                <p>Total Bookings: {reservations.length}</p>
                {reservations.length === 0 ? (
                  <div className="card p-3">
                    <p>You have not made any bookings yet</p>
                    <div>
                      <p style={{ color: "#1e2d7d ", fontWeight: 500 }}>
                        Want to book a place?
                      </p>
                      <Link
                        to={"/home"}
                        className="btn btn-secondary"
                        style={{ backgroundColor: "#ff385d ", border: "0px" }}
                      >
                        See our Listing
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Location</th>
                          <th>Check-In</th>
                          <th>Check-Out</th>
                          <th>City</th>
                          <th>Reservation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td>
                              {reservation.Property
                                ? reservation.Property.address
                                : "N/A"}
                            </td>
                            <td>{formatDate(reservation.checkIn)}</td>
                            <td>{formatDate(reservation.checkOut)}</td>
                            <td>
                              {reservation.Property
                                ? reservation.Property.city
                                : "N/A"}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setShowModal(true)}
                              >
                                Cancel Reservation
                              </button>
                              <div
                                className={`modal fade ${
                                  showModal ? "show" : ""
                                }`}
                                id={`exampleModal${reservation.id}`}
                                tabIndex="-1"
                                aria-labelledby={`exampleModalLabel${reservation.id}`}
                                aria-hidden={!showModal}
                                style={{
                                  display: showModal ? "block" : "none",
                                }}
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-body">
                                      <h6>
                                        Are you sure to cancel your reservation?
                                      </h6>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                          cancelReservation(reservation.id)
                                        }
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Reservations;
