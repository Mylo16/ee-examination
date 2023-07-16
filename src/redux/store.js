import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
import firestoreReducer, { fetchQuestions } from './firestore/firestoreSlice';
import quizReducer from './home/quizSlice';
import resultsReducer from './home/resultsSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    firestore: firestoreReducer,
    quiz: quizReducer,
    results: resultsReducer,
  },
});

store.dispatch(fetchQuestions());
export default store;