import { createSlice } from "@reduxjs/toolkit";

export const saveMenuSlice = createSlice({
  name: "saveMenu",
  initialState: {
    menuShown: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.menuShown = !state.menuShown;
    },
  },
});

export const { toggleMenu } = saveMenuSlice.actions;
export default saveMenuSlice.reducer;
