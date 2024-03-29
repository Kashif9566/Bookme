import React, { useState, useEffect, useCallback } from "react";
import Nav from "../layout/Nav";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader";
import api from "../../../../api/api";
import { useSelector } from "react-redux";

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { propertyId } = useParams();
  const user = useSelector((state) => state.user);
  const token = user.token;

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.get(
        `/host/property/${propertyId}/reservation`,
        config
      );
      if (data) {
        setReservations(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [propertyId, token]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="row">
      <div className="col-md-12">
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
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Guests</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
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

export default ReservationPage;
