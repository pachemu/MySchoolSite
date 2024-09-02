import React, { FC } from 'react';
import QuizComponent from "../../../features/quiz/ui/QuizComponent/QuizComponent";
import QuizList from "../../../features/quiz/ui/QuizList/QuizList";
import {Card} from "antd";
import {Link} from "react-router-dom";

const QuizPage: FC = () => {
    return (
        <div>
            <h1>Quiz Page</h1>
            <QuizList />
            <p>
                <Card>
                   {/*<Link to={'/create/quiz'}>*/}
                   {/*    создать новый тест*/}
                   {/*</Link>*/}
                </Card>
            </p>
        </div>
    );
};

export default QuizPage;
