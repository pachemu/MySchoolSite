import React, { FC } from 'react';
import QuizList from "../../../features/quiz/ui/QuizList/QuizList";

const QuizPage: FC = () => {
    return (
        <div>
            <h1>Страница тестов</h1>
            <QuizList />
        </div>
    );
};

export default QuizPage;
