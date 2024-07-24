// src/store/forgotPasswordSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ForgotPasswordState {
  email: string;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ForgotPasswordState = {
  email: '',
  loading: false,
  success: false,
  error: null,
};

export const sendResetEmail = createAsyncThunk(
  'forgotPassword/sendResetEmail',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/forgetPassword', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message); // Assuming error.response.data has a message property
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendResetEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
