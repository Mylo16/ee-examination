import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  initialState: {
    scrolled: false,
  },
  name: 'home',
  reducers: {
    setScrolledTrue: (state, action) => {
      state.scrolled = action.payload;
    },
    setScrolledFalse: (state, action) => {
      state.scrolled = action.payload;
    },
  },
});

export const { setScrolledFalse, setScrolledTrue} = homeSlice.actions;
export default homeSlice.reducer;