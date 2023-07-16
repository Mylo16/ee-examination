import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  initialState: {
    quizData: {},
  },
  name: 'quiz',
  reducers: {
    openQuiz: (state, action) => {
      state.quizData = action.payload;
    }
  },
});

export const { openQuiz } = quizSlice.actions;
export default quizSlice.reducer;