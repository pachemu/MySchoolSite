import React, {FC} from 'react';
import QuizList from "../../../features/quiz/ui/QuizList/QuizList";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../../features/user/model/useTypedSelector";
import * as styles from './QuizPage.module.scss'

const QuizPage: FC = () => {
    const navigate = useNavigate();
    const {auth} = useTypedSelector(state => state.authReducer)
    return (
        <div>
            <h1>Страница тестов</h1>
            <QuizList/>
            {auth ?
                <Button className={styles.createTest} onClick={() => navigate("/create/quiz")}>
                    Создать тест
                </Button>
                : <div></div>}
        </div>
    );
};

export default QuizPage;
