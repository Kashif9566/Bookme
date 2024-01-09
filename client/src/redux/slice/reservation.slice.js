import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  allReservations: [],
  isLoading: false,
  isError: false,
};

export const fetchAllReservationsForHost = createAsyncThunk(
  "fetchAllReservationsForHost",
  async (userId) => {
    const response = await api.get(`/host/${userId}/reservations`);
    return response.data;
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReservationsForHost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllReservationsForHost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allReservations = action.payload;
      })
      .addCase(fetchAllReservationsForHost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default reservationSlice.reducer;
export const selectAllReservationsForHost = (state) =>
  state.reservation.allReservations;
