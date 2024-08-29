import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlState } from "@/src/types/types";

const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
};

export const fetchUrls = createAsyncThunk("urls/fetchUrls", async () => {
  const response = await axios.get("/api/loggedUrl");
  return response.data;
});

const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch URLs";
      });
  },
});

export default loggedSlice.reducer;
