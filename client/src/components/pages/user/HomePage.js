import React, { useEffect } from "react";
import Properties from "./property/Properties";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProperty,
  fetchProperty,
} from "../../../redux/slice/property.slice";
import Nav from "./Nav";
import Footer from "./Footer/Footer";

const HomePage = () => {
  const properties = useSelector(selectProperty);
  console.log(properties);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProperty());
  }, [dispatch]);
  return (
    <div className="row">
      <div className="co-md-12">
        <Nav />
        <Properties />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
