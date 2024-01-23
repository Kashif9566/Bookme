import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => null,
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
