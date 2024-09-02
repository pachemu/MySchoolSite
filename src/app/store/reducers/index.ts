import quizReducer from './quiz/quizSlice'
import authReducer from "./auth/isAuthReducer";
export default {
    authReducer,
    quiz: quizReducer
}