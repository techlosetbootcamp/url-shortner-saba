import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { UrlStatusState, AxiosError } from "@/src/types/types";

const initialState: UrlStatusState = {
  loading: false,
  error: null,
};

export const updateUrlStatus = createAsyncThunk(
  "urlStatus/updateUrlStatus",
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      await axios.patch("/api/urlStatus", { shortUrl: id, status });
      return { id, status };
    } catch (err) {
      const error = err as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const urlStatusSlice = createSlice({
  name: "urlStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUrlStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUrlStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUrlStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUrlStatus = (state: RootState) => state.urlStatus;
export default urlStatusSlice.reducer;
