import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./layout/Nav";

const Welcome = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="row">
      <div className="col-md-12">
        <Nav />
        <div className="card py-5" style={{ border: "0px", height: "100%" }}>
          <div
            className="container d-flex justify-content-between align-items-center"
            style={{ height: "100%" }}
          >
            <div className="d-flex flex-column justify-content-center align-items-start mx-5">
              <span
                style={{
                  fontSize: "2.5rem",
                  marginTop: "1.5rem",
                  marginLeft: "1rem",
                }}
              >
                Welcome, {user.username}!
              </span>
              <p
                style={{
                  fontSize: "1.125rem",
                  marginLeft: "1rem",
                  color: "#727272",
                }}
              >
                Guests can reserve your place 24 hours after you publish—here’s
                how to prepare.
              </p>
              <span
                style={{
                  fontSize: "1.875rem",
                  marginTop: "1.25rem",
                  marginLeft: "1rem",
                }}
              >
                Manage your Listing here with Bookme
              </span>
              <div className="d-flex mt-3">
                <Link to="/hosting/listing" className="btn btn-secondary mx-2">
                  See Your Listing
                </Link>
                <Link to="/newListing" className="btn btn-secondary mx-2">
                  Add New Listing
                </Link>
              </div>
            </div>
            <div className="overflow-auto">
              <img
                className="mx-4 mt-4 img-fluid rounded"
                src="https://images.pexels.com/photos/2640604/pexels-photo-2640604.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                style={{ width: "300px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
