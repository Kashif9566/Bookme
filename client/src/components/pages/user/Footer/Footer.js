import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-light"
      style={{
        textAlign: "center",
        padding: "10px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <div className="text-muted my-2 d-flex me-2">
              © 2023 Bookme, Inc.
              <span className="mx-2">|</span>
              <span className="mx-2">Terms</span>
              <span className="mx-2">|</span>
              <span className="mx-2">Privacy</span>
              <span className="mx-2">|</span>
              <span className="mx-2">Your Privacy Choices</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
