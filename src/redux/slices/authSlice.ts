import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";
import { AuthState, AxiosError } from "@/src/types/types";

const initialState: AuthState = {
  name: "",
  email: "",
  passwords: {
    password: "",
    confirmPassword: "",
  },
  loading: false,
  isAuthenticated: false,
  success: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  void,
  {
    name: string;
    email: string;
    passwords: { password: string; confirmPassword: string };
  },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ name, email, passwords }, { rejectWithValue }) => {
    try {
      const { password, confirmPassword } = passwords;
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
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error?.response?.data || error?.message);
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  SignInResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
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
  } catch (err) {
    const error = err as AxiosError;
    toast.error("Login failed");
    return rejectWithValue(error.message);
  }
});

export const changePassword = createAsyncThunk<
  void,
  { token: string; newPassword: string },
  { rejectValue: string }
>(
  "auth/changePassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/changePassword", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const sendResetEmail = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/sendResetEmail", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/forgetPassword", { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});

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
    setPasswords: (
      state,
      action: PayloadAction<{ password: string; confirmPassword: string }>
    ) => {
      state.passwords = action.payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.passwords = { password: "", confirmPassword: "" };
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
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setName, setEmail, setPasswords, logout } = authSlice.actions;
export default authSlice.reducer;
