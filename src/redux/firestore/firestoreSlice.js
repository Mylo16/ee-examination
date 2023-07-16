import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchQuestions = createAsyncThunk('/firestore', async () => {
  try {
    const response = [];
    await getDocs(collection(db, 'questions'))
      .then((querySnashot) => {
        const newData =querySnashot.docs.map((doc) => (
          {
            ...doc.data(),
            id: doc.id,
          }
        ));
        response.push(newData[0]);
      });
    return await response[0];
  } catch (e) {
    throw new Error(e);
  }
});

const initialState = {
    questions: [],
    isLoading: false,
    error: false,
}

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
    })
     .addCase(fetchQuestions.pending, (state) => {
       state.isLoading = true
     })
     .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
     });
  },
});

export default firestoreSlice.reducer;