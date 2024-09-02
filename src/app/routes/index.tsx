import React from "react";
import Game from "../../pages/game/LazyGame";
import {CreateExamination} from "../../shared/ui/createExamenation/createExamination";
import Examination from "../../pages/examination/LazyExamination";
import Conspects from "../../pages/conspects/LazyConspects";
import Login from "../../pages/login/LazyLogin";
import Quiz from "../../pages/Quiz/LazyQuizPage";
import QuizComponent from "../../features/quiz/ui/QuizComponent/QuizComponent";
import QuizForm from "../../features/quiz/ui/QuizForm/QuizForm";

export interface IRoute {
    path: string;
    component: React.ReactNode;
    exact?: boolean;
    logout?: ()=> {}
}
export enum RouteNames {
    LOGIN = '/login',
    EXAMINATION = '/examination',
    CONSPECTS = '/conspects',
    GAME = '/game',
    CREATEEXAMINATION = '/create/quiz',
    QUIZ = '/quiz',
    QUIZ_BY_ID = '/quiz/:quizId',
}
const baseRoutes: IRoute[] = [
    {path: RouteNames.CONSPECTS, component: <Conspects/>, exact: true},
    {path: RouteNames.GAME, component: <Game/>, exact: true},
    {path: RouteNames.QUIZ, component: <Quiz/>},
    {path: RouteNames.QUIZ_BY_ID, component: <QuizComponent/>}
]


export const teacherRoutes: IRoute[] = baseRoutes.concat([
    {path: RouteNames.CREATEEXAMINATION, component: <QuizForm/>},
])
export const unLoginedUsers: IRoute[] = baseRoutes.concat([
    {path: RouteNames.LOGIN, component: <Login/>},
])