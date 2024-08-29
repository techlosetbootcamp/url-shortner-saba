import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CustomSlugState, AxiosError } from "@/src/types/types";

const initialState: CustomSlugState = {
  originalUrl: "",
  customSlug: "",
  shortUrl: "",
  status: "idle",
  error: null,
};

export const shortenUrl = createAsyncThunk(
  "customSlug/shortenUrl",
  async (
    { url, customSlug }: { url: string; customSlug: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/shortUrl", { url, customSlug });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const customSlugSlice = createSlice({
  name: "customSlug",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shortUrl = action.payload.shortUrl;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default customSlugSlice.reducer;
