// Analytics.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../layout/Nav";
import Card from "./Card";
import ReservationsChart from "./ReservationsChart";
import {
  fetchPropertyForHost,
  selectPropertiesForHost,
} from "../../../../redux/slice/property.slice";
import {
  fetchAllReservationsForHost,
  selectAllReservationsForHost,
} from "../../../../redux/slice/reservation.slice";
import RevenueDonutChart from "./RevenueDonutChart";

const Analytics = () => {
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyForHost(userId));
    dispatch(fetchAllReservationsForHost(userId));
  }, [dispatch, fetchPropertyForHost, fetchAllReservationsForHost]);

  const loading = useSelector((state) => state.property.isLoading);
  const properties = useSelector(selectPropertiesForHost);
  const reservations = useSelector(selectAllReservationsForHost);

  const reservationsData = Array.from({ length: 31 }, (_, i) => {
    const date = i + 1;
    const reservationsForDay = reservations.filter((r) => {
      const reservationDate = new Date(r.createdAt).getDate();
      return reservationDate === date;
    });
    return reservationsForDay.length;
  });

  const totalRevenue = reservations.reduce((total, reservation) => {
    const property = properties.find((p) => p.id === reservation.PropertyId);
    return total + (property ? property.price : 0);
  }, 0);

  return (
    <div style={{ backgroundColor: "#fdfcfe" }}>
      <div className="row">
        <div className="col-12">
          <Nav />
          <div className="container">
            <h2 className="my-2">Analytics</h2>
            <div className="d-flex flex-wrap justify-content-between">
              <Card
                title={"Total Listings"}
                value={
                  properties.length === 0 ? (
                    <p>No Listing Yet</p>
                  ) : (
                    <h4>{properties.length}</h4>
                  )
                }
              />
              <Card
                title={"Total Reservations"}
                value={
                  reservations.length === 0 ? (
                    <p>No Reservations Yet</p>
                  ) : (
                    <h4>{reservations.length}</h4>
                  )
                }
              />
              <Card title={"Revenue"} value={<h4>${totalRevenue}</h4>} />
            </div>
            <div className="row d-flex justify-content-between">
              <div className="card col-7">
                <h4 className="mx-3 mt-3">Reservations Stats</h4>
                <ReservationsChart reservationsData={reservationsData} />
              </div>
              <div className="card col-4">
                <RevenueDonutChart revenueData={totalRevenue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
