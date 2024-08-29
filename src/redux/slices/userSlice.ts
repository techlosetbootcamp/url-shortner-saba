import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlState, UrlData } from "@/src/types/types";

const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
};

export const fetchUrls = createAsyncThunk("urls/fetchUrls", async () => {
  const response = await axios.get("/api/loggedUrl");
  return response.data;
});

export const deleteUrl = createAsyncThunk(
  "urls/deleteUrl",
  async (id: string) => {
    try {
      await axios.delete("/api/deleteUrl", { data: { shortUrl: id } });

      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const updateShortUrl = createAsyncThunk(
  "urls/updateShortUrl",
  async ({
    oldShortUrl,
    newShortUrl,
  }: {
    oldShortUrl: string;
    newShortUrl: string;
  }) => {
    await axios.patch("/api/updateUrl", { oldShortUrl, newShortUrl });
    return { oldShortUrl, newShortUrl };
  }
);

const userSlice = createSlice({
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
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch URLs";
      })
      .addCase(deleteUrl.fulfilled, (state, action: PayloadAction<string>) => {
        state.urls = state.urls.filter((url) => url.id !== action.payload);
      })
      .addCase(
        updateShortUrl.fulfilled,
        (
          state,
          action: PayloadAction<{ oldShortUrl: string; newShortUrl: string }>
        ) => {
          const index = state.urls.findIndex(
            (url) => url.shortUrl === action.payload.oldShortUrl
          );
          if (index !== -1) {
            state.urls[index].shortUrl = action.payload.newShortUrl;
          }
        }
      );
  },
});

export default userSlice.reducer;
