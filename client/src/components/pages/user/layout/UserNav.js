import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../../redux/slice/user.slice";
import { useState, useRef, useEffect } from "react";
import { searchProperty } from "../../../../redux/slice/property.slice";
import UserProfileCard from "./UserProfileCard";

const UserNav = () => {
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
                href="/home"
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
                    style={{ width: "100%", minWidth: "200px" }}
                  />
                  <button
                    className="btn btn-outline-dark rounded-pill"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
              <hr className="w-75 mx-0 my-1" />
              <li className="nav-item">
                <a className="nav-link" href="/reservations">
                  Reservations
                </a>
              </li>
              <hr className="w-75 mx-0 my-1" />

              <li className="nav-item">
                <button
                  className="btn btn-link"
                  href="#"
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
        <UserProfileCard
          user={user}
          avatarSrc={avatarSrc}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default UserNav;
