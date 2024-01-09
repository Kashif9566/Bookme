import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import propertyReducer from "./slice/property.slice";
import reviewReducer from "./slice/review.slice";
import reservationSlice from "./slice/reservation.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    review: reviewReducer,
    reservation: reservationSlice,
  },
  devTools: true,
});
