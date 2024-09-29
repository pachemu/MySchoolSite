import { Card, List, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz } from "../../api"; // Предположим, что deleteQuiz также доступен в API
import { Link } from "react-router-dom";
import {useTypedSelector} from "../../../user/model/useTypedSelector";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { auth } = useTypedSelector(state => state.authReducer); // Проверяем авторизацию пользователя

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizzes();
                setQuizzes(data);
            } catch (error) {
                console.error("Ошибка загрузки тестов", error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleDelete = async (quizId) => {
        try {
            await deleteQuiz(quizId); // Предположим, что deleteQuiz отправляет запрос на сервер
            setQuizzes(quizzes.filter(quiz => quiz.id !== quizId)); // Удаляем квиз из состояния
            message.success("Тест удален успешно!");
        } catch (error) {
            console.error("Ошибка удаления теста", error);
            message.error("Ошибка");
        }
    };

    return (
        <div>
            <Card>
                <List
                    pagination={{ position: 'both', align: 'center' }}
                    dataSource={quizzes}
                    renderItem={(item) => (
                        <List.Item
                            actions={auth ? [ // Отображаем кнопку только для авторизованных пользователей
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Удалить
                                </Button>
                            ] : []}
                        >
                            <List.Item.Meta
                                title={<Link to={`${item.id}`}>{item.name}</Link>}
                                description={`Тест создан: ${item.author}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default QuizList;
