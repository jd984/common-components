import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localToken: "",
};

export const GetTokenSlice = createSlice({
  name: "GetToken",
  initialState,
  reducers: {
    setLocalToken: (state, action) => {
      state.localToken = action.payload;
    },
  },
});

export const { setLocalToken } = GetTokenSlice.actions;
export default GetTokenSlice.reducer;
