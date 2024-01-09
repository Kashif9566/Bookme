import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../../Loader";
import Nav from "../Nav";
import api from "../../../../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.id;

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchReservations = useCallback(async () => {
    try {
      const response = await api.get(`/user/${userId}/reservation`);
      setReservations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const cancelReservation = async (reservationId) => {
    try {
      const response = await api.delete(
        `/user/${userId}/reservation/${reservationId}`
      );
      if (response.status === 200) {
        toast.success("Reservation Cancelled", { autoClose: 1000 });
        fetchReservations(); // Call the callback after successful cancellation
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
          <div className="col-12">
            <Nav />
            <div className="container">
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h3>My Bookings</h3>
                <p>Total Bookings: {reservations.length}</p>
                {reservations.length === 0 ? (
                  <p>You have not made any bookings yet.</p>
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
                            <td>{reservation.Property.address}</td>
                            <td>{formatDate(reservation.checkIn)}</td>
                            <td>{formatDate(reservation.checkOut)}</td>
                            <td>{reservation.Property.city}</td>
                            <td>
                              <div
                                className="btn btn-danger"
                                onClick={() =>
                                  cancelReservation(reservation.id)
                                }
                              >
                                Cancel Reservation
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
