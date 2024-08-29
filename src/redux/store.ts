import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import urlReducer from "./slices/urlSlice";
import urlStatusReducer from "./slices/urlStatusSlice";
import userSliceReducer from "./slices/userSlice";
import loggedReducer from "./slices/loggedSlice";
import profileReducer from "./slices/profileSlice";
import customSlugReducer from "./slices/customSlugSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
    urlStatus: urlStatusReducer,
    userSlice: userSliceReducer,
    logged: loggedReducer,
    profile: profileReducer,
    customSlug: customSlugReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
