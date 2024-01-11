import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProperty,
  fetchProperty,
  selectSearchProperty,
} from "../../../../redux/slice/property.slice";
import PropertyModel from "./PropertyModel";
import Loader from "../../../Loader";

const Properties = () => {
  const properties = useSelector(selectProperty);
  const searchResult = useSelector(selectSearchProperty);
  const isLoading = useSelector((state) => state.property.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperty());
  }, [dispatch]);

  const filteredProperties = searchResult ? searchResult : properties;

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="row">
          {filteredProperties.map((property) => (
            <div key={property.id} className="col-md-3 mt-3">
              <PropertyModel property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
