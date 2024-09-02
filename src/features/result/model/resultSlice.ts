import { createSlice } from '@reduxjs/toolkit';

interface ResultState {
    score: number;
    totalQuestions: number;
}

const initialState: ResultState = {
    score: 0,
    totalQuestions: 0,
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setResult(state, action) {
            state.score = action.payload.score;
            state.totalQuestions = action.payload.totalQuestions;
        },
    },
});

export const { setResult } = resultSlice.actions;
export default resultSlice.reducer;
