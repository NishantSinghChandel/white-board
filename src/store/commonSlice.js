import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "dark",
  },
  reducers: {
    themeToggled: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { themeToggled } = commonSlice.actions;
export default commonSlice.reducer;
