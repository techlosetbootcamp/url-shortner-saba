import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { signIn, SignInResponse } from "next-auth/react";

import toast from "react-hot-toast";

interface AuthState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk<
  void,
  { name: string; email: string; password: string; confirmPassword: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      toast.success("Successfully registered");
      window.location.assign("/login");
      return response.data;
    } catch (err: any) {
      toast.error(err?.response?.data || err.message);
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  SignInResponse,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.ok) {
        toast.success("Successful login");
        window.location.assign("/main");
        return loginResult;
      } else {
        toast.error(loginResult?.error || "Login failed");
        return rejectWithValue(loginResult?.error || "Login failed");
      }
    } catch (error: any) {
      toast.error("Login failed");
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { setName, setEmail, setPassword, setConfirmPassword, logout } = authSlice.actions;
export default authSlice.reducer;
