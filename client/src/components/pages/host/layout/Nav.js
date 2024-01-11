import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../../redux/slice/user.slice";
import { useState } from "react";
import api from "../../../../api/api";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(clearUser());
    navigate("/login");
  };

  const handleNotLogin = () => {
    navigate("/login");
  };

  const avatarSrc = `https://ui-avatars.com/api/?name=${user?.username}&size=40`;

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  return (
    <div>
      <nav className="navbar shadow navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <a
                className="navbar-brand"
                href="/hosting"
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#ff385d",
                }}
              >
                Bookme
              </a>
            </div>
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/hosting"
                  onClick={() => navigate("/hosting")}
                >
                  Home
                </a>
              </li>
              <hr className="w-75 mx-0 my-1" />
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/hosting/listing"
                  onClick={() => navigate("/hosting/listing")}
                >
                  Listing
                </a>
              </li>
              <hr className="w-75 mx-0 my-1" />
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/hosting/analytics"
                  onClick={() => navigate("//hosting/analytics")}
                >
                  Analytics
                </a>
              </li>
              <hr className="w-75 mx-0 my-1" />
              <li className="nav-item">
                <a className="nav-link" href="/hosting/reservations">
                  Reservations
                </a>
              </li>
              <hr className="w-75 mx-0 my-1" />
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={user ? handleLogout : handleNotLogin}
                >
                  {user ? "Logout" : "Login"}
                </button>
              </li>
              <hr className="w-75 mx-0 my-1" />

              <li className="nav-item">
                <button
                  className="btn btn-link"
                  href="#"
                  style={{ marginLeft: "auto" }}
                  onClick={toggleProfileCard}
                >
                  <img
                    src={avatarSrc}
                    alt="Profile Avatar"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      color: "#ff385d",
                    }}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showProfileCard && (
        <div
          className="card p-3 m-3"
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <div className="d-flex">
            {user.image ? (
              <img
                src={`${api.defaults.baseURL}/${user.image}`}
                alt={`Profile of ${user.username}`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  color: "#ff385d",
                }}
              />
            ) : (
              <img
                src={avatarSrc}
                alt="Profile Avatar"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  color: "#ff385d",
                }}
              />
            )}

            <div className="d-flex flex-column align-items-center mx-3 mt-3">
              <p style={{ fontSize: "20px", fontWeight: 600 }}>
                {user?.username}
              </p>
              <p>{user?.email}</p>
            </div>
          </div>

          <hr />
          <button
            className="btn btn-outline-dark rounded-pill mx-2"
            onClick={user ? handleLogout : handleNotLogin}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
