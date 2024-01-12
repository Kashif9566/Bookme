import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  properties: [],
  singleProperty: null,
  searchProperties: null,
  hostProperties: [],
  isLoading: false,
  isError: false,
};

export const fetchProperty = createAsyncThunk(
  "property/fetchProperty",
  async () => {
    const response = await api.get("/allProperties");
    return response.data;
  }
);

export const fetchPropertyById = createAsyncThunk(
  "property/propertyId",
  async ({ propertyId }) => {
    const response = await api.get(`/property/${propertyId}`);
    return response.data;
  }
);

export const searchProperty = createAsyncThunk(
  "searchProperty",
  async (searchTerm) => {
    const response = await api.get(`/search?query=${searchTerm}`);
    return response.data;
  }
);

export const fetchPropertyForHost = createAsyncThunk(
  "fetchPropertyForHost",
  async ({ userId }) => {
    const response = await api.get(`/user/${userId}/property`);
    return response.data;
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperty.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchProperty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchProperties = action.payload;
      })
      .addCase(searchProperty.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchPropertyForHost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPropertyForHost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hostProperties = action.payload;
      })
      .addCase(fetchPropertyForHost.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default propertySlice.reducer;
export const selectProperty = (state) => state.property.properties;
export const selectSingleProperty = (state) => state.property.singleProperty;
export const selectSearchProperty = (state) => state.property.searchProperties;
export const selectPropertiesForHost = (state) => state.property.hostProperties;
