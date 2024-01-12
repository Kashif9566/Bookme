import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListingModel from "./ListingModel";
import Nav from "../layout/Nav";
import Loader from "../../../Loader";
import {
  fetchPropertyForHost,
  selectPropertiesForHost,
} from "../../../../redux/slice/property.slice";

const ListingPage = () => {
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const token = user.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyForHost({ userId }));
  }, [dispatch, userId]);

  const loading = useSelector((state) => state.property.isLoading);
  const properties = useSelector(selectPropertiesForHost);

  const handlePropertyDeleted = () => {
    dispatch(fetchPropertyForHost({ userId, token }));
  };

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
                        onPropertyDeleted={handlePropertyDeleted}
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
