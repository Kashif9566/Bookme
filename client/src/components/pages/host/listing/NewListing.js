import React from "react";
import { useSelector } from "react-redux";
import { FaHome, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NewListing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleExit = () => {
    navigate("/hosting");
  };
  return (
    <div className="container">
      <div>
        <div className="d-flex justify-content-between align-items-center mx-2 my-5">
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            <FaHome /> Bookme.com
          </span>
          <button
            style={{
              border: "1px solid black",
              borderRadius: "20px",
              padding: "6px 15px 6px 15px",
            }}
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ margin: 150 }}
        >
          <span style={{ fontSize: "35px", fontWeight: "500" }}>
            Welcome back, {user.username}
          </span>
          <span style={{ fontSize: "25px", fontWeight: "400" }}>
            Start a new listing
          </span>
          <Link
            to={"/listingForm"}
            className="d-flex align-items-center justify-content-between mt-4"
          >
            <div
              style={{
                background: "transparent",
                border: "none",
                fontSize: "35px",
                cursor: "pointer",
                marginRight: "20px",
              }}
            >
              <FaHome />
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 300,
                marginTop: "11px",
              }}
            >
              Create a New Listing
            </div>
            <button
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                marginTop: "5px",
                marginLeft: "20px",
              }}
            >
              <FaArrowRight />
            </button>
          </Link>
          <hr
            style={{
              width: "50%",
              borderTop: "1px solid black",
              margin: "20px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewListing;
