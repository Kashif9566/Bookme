import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="card shadow col-3 my-3 border-0 p-3">
      <h4>{title}</h4>
      <div>{value}</div>
    </div>
  );
};

export default Card;
