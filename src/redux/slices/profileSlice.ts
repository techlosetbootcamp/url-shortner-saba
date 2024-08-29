import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {ProfileStates,AxiosError} from "@/src/types/types"
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ email, newName, newEmail }: { email: string; newName: string; newEmail: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/updateProfile', { email, newName, newEmail });
      return response.data.user;
    } catch (err) {
      const error = err as AxiosError
      return rejectWithValue(error?.response?.data);
    }
  }
);
const initialState: ProfileStates = {
  name: '',
  email: '',
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
