import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slice/user.slice";
import ListingPage from "./components/pages/host/listing/ListingPage";
import NewListing from "./components/pages/host/listing/NewListing";
import ListingForm from "./components/pages/host/listing/ListingForm";
import HomePage from "./components/pages/user/HomePage";
import PropertyDetails from "./components/pages/user/property/PropertyDetails";
import Welcome from "./components/pages/host/Welcome";
import ReservationPage from "./components/pages/host/reservation/ReservationPage";
import AllReservations from "./components/pages/host/reservation/AllReservations";
import Reservations from "./components/pages/user/reservations/Reservations";
import Analytics from "./components/pages/host/analytics/Analytics";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./components/pages/UpdateProfile/UpdateProfile";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user ? (
          user.role === "host" ? (
            <>
              <Route path="/hosting" element={<Welcome />} />
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
              <Route path="/hosting/analytics" element={<Analytics />} />
              <Route path="/hosting/profile" element={<UpdateProfile />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/propertyDetails/:propertyId"
                element={<PropertyDetails />}
              />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </>
          )
        ) : (
          <>
            <Route path="/*" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
