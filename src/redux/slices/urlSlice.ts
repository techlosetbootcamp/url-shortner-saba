import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlData, UrlState } from "../../types/types";
const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
};

export const fetchUrls = createAsyncThunk("urls/fetchUrls", async () => {
  const response = await axios.get<UrlData[]>("/api/getUrl");
  return response.data;
});

export const shortUrl = createAsyncThunk<UrlData[], string>(
  "urls/shortUrl",
  async (url) => {
    await axios.post("/api/shortUrl", { url });
    const response = await axios.get<UrlData[]>("/api/getUrl");
    return response.data;
  }
);

const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUrls.fulfilled,
        (state, action: PayloadAction<UrlData[]>) => {
          state.loading = false;
          state.urls = action.payload;
        }
      )
      .addCase(fetchUrls.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching URLs";
      })
      .addCase(shortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        shortUrl.fulfilled,
        (state, action: PayloadAction<UrlData[]>) => {
          state.loading = false;
          state.urls = action.payload;
        }
      )
      .addCase(shortUrl.rejected, (state) => {
        state.loading = false;
        state.error = "Error shortening URL";
      });
  },
});

export default urlSlice.reducer;
