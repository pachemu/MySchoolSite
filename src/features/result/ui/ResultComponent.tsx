import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Progress, Button, List, Card, Typography, Row, Col } from 'antd';
import { RootState } from '../../../app/store/StoreProvider';
import { startQuiz } from '../../../app/store/reducers/quiz/quizSlice';

const { Title, Text } = Typography;

const ResultsComponent = () => {
    const dispatch = useDispatch();
    const { questions, answers } = useSelector((state: RootState) => state.quiz);

    const totalQuestions = questions.length;

    const correctAnswers = questions.filter((question, index) => {
        const correctAnswer = Array.isArray(question.correctAnswer)
            ? question.correctAnswer.join(', ')
            : question.correctAnswer;

        const userAnswer = Array.isArray(answers[question.id])
            ? (answers[question.id] as string[]).join(', ')
            : answers[question.id] || '';  // Получаем ответ пользователя из глобального состояния

        return correctAnswer === userAnswer;
    });

    const score = correctAnswers.length;
    const percentage = (score / totalQuestions) * 100;

    const getResultMessage = () => {
        if (percentage === 100) {
            return "Идеально! Вы ответили на все вопросы правильно!";
        } else if (percentage >= 80) {
            return "Отличная работа! Вы набрали высокий балл!";
        } else if (percentage >= 50) {
            return "Неплохо! Вы ответили более чем на половину вопросов.";
        } else {
            return "В следующий раз будет лучше! Продолжайте тренироваться!";
        }
    };

    const handleRestartQuiz = () => {
        dispatch(startQuiz());
    };

    return (
        <Card title="Результаты Квиза" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <Title level={2}>{getResultMessage()}</Title>
            <Progress
                type="circle"
                percent={percentage}
                format={percent => `${percent.toFixed(0)}%`}
                style={{ marginBottom: 20 }}
                status={percentage >= 50 ? 'success' : 'exception'}
            />

            <Text strong style={{ display: 'block', marginBottom: 20 }}>
                Ваш результат: {score} из {totalQuestions} ({percentage.toFixed(2)}%)
            </Text>

            <List
                header={<Title level={3}>Ваши ответы</Title>}
                bordered
                dataSource={questions}
                renderItem={(question, index) => {
                    const correctAnswer = Array.isArray(question.correctAnswer)
                        ? question.correctAnswer.join(', ')
                        : question.correctAnswer;

                    const userAnswer = Array.isArray(answers[question.id])
                        ? (answers[question.id] as string[]).join(', ')
                        : answers[question.id] || '';  // Получаем ответ пользователя из глобального состояния

                    const isCorrect = correctAnswer === userAnswer;
                    return (
                        <List.Item key={question.text} style={{ padding: '16px 24px' }}>
                            <Row style={{ width: '100%' }}>
                                <Col span={16}>
                                    <Text strong>{`Вопрос ${index + 1}: ${question.text}`}</Text>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Text type={isCorrect ? 'success' : 'danger'}>
                                        Ваш ответ: {userAnswer}
                                    </Text>
                                    {!isCorrect && (
                                        <>
                                            <br />
                                            <Text type="secondary">
                                                Правильный ответ: {correctAnswer}
                                            </Text>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </List.Item>
                    );
                }}
            />

            <Button type="primary" onClick={handleRestartQuiz} style={{ marginTop: 20 }}>
                Пройти квиз заново
            </Button>
        </Card>
    );
};

export default ResultsComponent;
