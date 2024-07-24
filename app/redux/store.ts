// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import forgotPasswordReducer from './slices/useForgetPasswordSlice';
import changePasswordReducer from './slices/useChangePasswordSlice';
import authReducer from './slices/authSlice';
// import passwordReducer from './slices/useChangePasswordSlice';
const store = configureStore({
  reducer: {

    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    // password: passwordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
