import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
};
export const fetchReviews = createAsyncThunk(
  "fetchReviews",
  async ({ propertyId }) => {
    const response = await api.get(`/reviews/property/${propertyId}`);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default reviewSlice.reducer;
export const selectReview = (state) => state.review.reviews;
