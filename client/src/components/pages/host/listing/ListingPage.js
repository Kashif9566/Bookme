import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingModel from "./ListingModel";
import Nav from "../layout/Nav";
import Loader from "../../../Loader";
import api from "../../../../api/api";

const ListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const userId = user.id;

  const fetchPropertyForUser = useCallback(async () => {
    try {
      const { data } = await api.get(`/user/${userId}/property`);
      if (data) {
        setProperties(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPropertyForUser();
  }, [fetchPropertyForUser]);

  return (
    <div className="row">
      <div className="col-md-12">
        <Nav />
        {loading ? (
          <Loader />
        ) : (
          <div className="container">
            <div>
              <div className="d-flex justify-content-between align-items-center mx-2 my-4">
                <div className="d-flex flex-column">
                  <span style={{ fontSize: "30px", fontWeight: "600" }}>
                    Your listings
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "400" }}>
                    {loading
                      ? "Loading..."
                      : properties.length === 1
                      ? "You have 1 property listing"
                      : properties.length === 0
                      ? "You don't have any property listings yet"
                      : `You have ${properties.length} property listings`}
                  </span>
                </div>

                <Link
                  to={"/newListing"}
                  className="btn btn-secondary"
                  style={{ backgroundColor: "#ff385d", border: "0px" }}
                >
                  New Listing
                </Link>
              </div>
              <div className="container">
                <div className="row">
                  {properties.map((property) => (
                    <div key={property.id} className="col-md-4 ">
                      <ListingModel
                        property={property}
                        fetchPropertyForUser={fetchPropertyForUser}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
