import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Radio, Input, Checkbox, Form } from 'antd';
import { AppDispatch, RootState } from '../../../../app/store/StoreProvider';
import { fetchQuizById, questionAnswered, startQuiz } from '../../../../app/store/reducers/quiz/quizSlice';
import ResultsComponent from '../../../result/ui/ResultComponent';

const QuizComponent = () => {
    const { quizId } = useParams(); // Получаем ID квиза из URL
    const dispatch = useDispatch<AppDispatch>();
    const [quizStarted, setQuizStarted] = useState(false); // Состояние для отображения квиза

    const { questions, currentQuestionIndex, loading, error } = useSelector((state: RootState) => state.quiz);
    useEffect(() => {
        if (quizId) {
            dispatch(fetchQuizById(quizId)); // Загружаем данные квиза по ID
        }
    }, [quizId, dispatch]);

    // Проверка завершения квиза
    if (quizStarted && currentQuestionIndex >= questions.length) {
        return <ResultsComponent />;
    }

    // Обработка загрузки и ошибок
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</p>;
    }

    // Рендеринг компонента "Loading" до начала квиза или при загрузке вопросов
    if (!quizStarted || !questions || questions.length === 0) {
        return (
            <div>
                {!quizStarted ? (
                    <Button type="primary" onClick={() => { dispatch(startQuiz()); setQuizStarted(true); }}>
                        Начать Квиз
                    </Button>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSubmit = (value: string | string[]) => {
        dispatch(questionAnswered({ questionId: currentQuestion.id, answer: value }));
    };

    return (
        <Card title={`Вопрос ${currentQuestionIndex + 1}`}>
            <p>{currentQuestion.text}</p>

            <Form onFinish={(values) => handleAnswerSubmit(values.answer)}>
                {currentQuestion.type === 'radio' && (
                    <Form.Item name="answer" rules={[{ required: true, message: 'Пожалуйста, выберите ответ!' }]}>
                        <Radio.Group options={currentQuestion.options} />
                    </Form.Item>
                )}

                {currentQuestion.type === 'input' && (
                    <Form.Item name="answer" rules={[{ required: true, message: 'Пожалуйста, введите ваш ответ!' }]}>
                        <Input />
                    </Form.Item>
                )}

                {currentQuestion.type === 'checkbox' && (
                    <Form.Item name="answer" rules={[{ required: true, message: 'Пожалуйста, выберите хотя бы один вариант!' }]}>
                        <Checkbox.Group options={currentQuestion.options} />
                    </Form.Item>
                )}

                <Button type="primary" htmlType="submit">
                    Отправить ответ
                </Button>
            </Form>
        </Card>
    );
};

export default QuizComponent;
