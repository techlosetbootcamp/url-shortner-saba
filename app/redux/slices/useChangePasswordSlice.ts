// src/store/changePasswordSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChangePasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ChangePasswordState = {
  loading: false,
  success: false,
  error: null,
};

export const changePassword = createAsyncThunk(
  'changePassword/changePassword',
  async ({ token, newPassword }: { token: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/changePassword', { token, newPassword });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default changePasswordSlice.reducer;
