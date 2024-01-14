import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../../redux/slice/user.slice";
import { useState, useRef, useEffect } from "react";
import ProfileCard from "./ProfileCard";

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

  const avatarSrc = `https://ui-avatars.com/api/?name=${user?.username}&size=40`;

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  const profileButtonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target) &&
        !event.target.closest(".profile-card")
      ) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
            <ul className="host-navbar navbar-nav ml-auto d-flex align-items-center">
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
                  className="btn btn-link"
                  style={{ marginLeft: "auto" }}
                  onClick={toggleProfileCard}
                  ref={profileButtonRef}
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
        <ProfileCard
          user={user}
          avatarSrc={avatarSrc}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Nav;
