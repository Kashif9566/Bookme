import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUser } from "./redux/slice/user.slice";
import ListingPage from "./components/pages/host/listing/ListingPage";
import NewListing from "./components/pages/host/listing/NewListing";
import ListingForm from "./components/pages/host/listing/ListingForm";
import HomePage from "./components/pages/user/HomePage";
import PropertyDetails from "./components/pages/user/property/PropertyDetails";
import Welcome from "./components/pages/host/Welcome";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";
import ReservationPage from "./components/pages/host/reservation/ReservationPage";
import AllReservations from "./components/pages/host/reservation/AllReservations";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setUser(userInfo));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<RegistrationPage />} />
        {user ? (
          user.role === "host" ? (
            <>
              <Route path="/hosting" isHost={true} element={<Welcome />} />
              <Route path="/hosting/listing" element={<ListingPage />} />
              <Route path="/newListing" element={<NewListing />} />
              <Route path="/listingForm" element={<ListingForm />} />
              <Route
                path="/hosting/property/:propertyId/reservations"
                element={<ReservationPage />}
              />
              <Route
                path="/hosting/reservations"
                element={<AllReservations />}
              />
            </>
          ) : (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/propertyDetails/:propertyId"
                element={<PropertyDetails />}
              />
            </>
          )
        ) : (
          <Route path="/*" element={<RegistrationPage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
