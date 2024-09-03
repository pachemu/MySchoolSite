import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface QuizState {
    questions: any[];
    currentQuestionIndex: number;
    loading: boolean;
    error: string | null;
    answers: Record<string, string | string[]>;
    score: number;
}

const initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    loading: false,
    error: null,
    answers: {},
    score: 0,
};
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Асинхронный thunk для загрузки квиза по ID
export const fetchQuizById = createAsyncThunk(
    'quiz/fetchQuizById',
    async (quizId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://backend-2tsthsknn-debchiks-projects.vercel.app/quizzes/${quizId}`);
            let questions = response.data.questions;

            // Перемешиваем вопросы
            shuffleArray(questions);

            // Перемешиваем опции в каждом вопросе
            questions.forEach((question: any) => {
                if (question.options) {
                    shuffleArray(question.options);
                }
            });

            return questions; // Возвращаем перемешанные вопросы
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        questionAnswered(state, action) {
            const { questionId, answer } = action.payload;
            const currentQuestion = state.questions[state.currentQuestionIndex];

            // Проверка на наличие questionId
            if (questionId) {
                state.answers[questionId] = answer; // Сохранение ответа
            } else {
                console.error('Ошибка: Отсутствует questionId');
            }

            state.currentQuestionIndex += 1;
        },
        startQuiz(state) {
            state.currentQuestionIndex = 0;
            state.answers = {}; // Сброс ответов при начале нового квиза
            state.score = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizById.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuizById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { questionAnswered, startQuiz } = quizSlice.actions;
export default quizSlice.reducer;
