import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../redux/slice/user.slice";
import { useState } from "react";
import { searchProperty } from "../../../redux/slice/property.slice";
import { Link } from "react-router-dom";
import api from "../../../api/api";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProperty(searchTerm));
  };

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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/home"
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#ff385d",
              marginRight: "auto",
            }}
          >
            Bookme
          </a>

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

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <form
              className="d-flex align-items-center mx-auto"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2 rounded-pill mx-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-dark rounded-pill"
                type="submit"
              >
                Search
              </button>
            </form>

            <Link
              to="/reservations"
              className="btn btn-outline-dark rounded-pill mx-2"
            >
              My Bookings
            </Link>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-dark rounded-pill mx-2"
                onClick={user ? handleLogout : handleNotLogin}
              >
                {user ? "Logout" : "Login"}
              </button>
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
            </div>
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
            <img
              src={`${api.defaults.baseURL}/${user.image}`}
              alt="Profile Avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                color: "#ff385d",
              }}
            />
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
