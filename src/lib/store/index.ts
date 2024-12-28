import { configureStore } from "@reduxjs/toolkit";
import GetTokenSlice from "@/lib/store/GetNewToken";

export const store = configureStore({
  reducer: {
    GetToken: GetTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
