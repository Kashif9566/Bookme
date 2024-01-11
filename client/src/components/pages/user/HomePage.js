import React from "react";
import Properties from "./property/Properties";

import Nav from "./Nav";

const HomePage = () => {
  return (
    <div className="row">
      <div className="co-md-12">
        <Nav />
        <Properties />
      </div>
    </div>
  );
};

export default HomePage;
