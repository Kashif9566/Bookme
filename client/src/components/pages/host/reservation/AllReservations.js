import React, { useState, useEffect, useCallback } from "react";
import Nav from "../layout/Nav";
import { useSelector } from "react-redux";
import Loader from "../../../Loader";
import api from "../../../../api/api";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/host/${user.id}/reservations`);
      if (data) {
        setReservations(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="row">
      <div className="col-12">
        <Nav />
        <div className="container mt-4">
          <h2 className="my-3">Reservations</h2>
          <h5>List of customers who reserved your place</h5>

          <div className="card p-3" style={{ backgroundColor: "#f0efe9" }}>
            <span style={{ fontWeight: 600 }}>
              Total Reservations: {reservations.length}
            </span>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive mt-4">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Guests</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Property</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex flex-column">
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>
                              {reservation.User.username}
                            </span>
                            <span>{reservation.User.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {new Date(reservation.checkIn).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(reservation.checkOut).toLocaleDateString()}
                      </td>
                      <td>
                        <p>{reservation.Property.title}</p>
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
  );
};

export default AllReservations;
