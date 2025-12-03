import React, {useState, useEffect} from 'react';
import * as styles from './QuizComponent.module.scss'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Button, Radio, Input, Checkbox, Form} from 'antd';
import {AppDispatch, RootState} from '../../../../app/store/StoreProvider';
import {fetchQuizById, questionAnswered, startQuiz} from '../../../../app/store/reducers/quiz/quizSlice';
import ResultsComponent from '../../../result/ui/ResultComponent';

const QuizComponent = () => {
    const {quizId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [quizStarted, setQuizStarted] = useState(false);

    const {questions, currentQuestionIndex, loading, error} = useSelector((state: RootState) => state.quiz);

    // создаём form instance
    const [form] = Form.useForm();

    useEffect(() => {
        if (quizId) {
            dispatch(fetchQuizById(quizId));
        }
    }, [quizId, dispatch]);

    // Сбрасываем поле answer при смене вопроса
    useEffect(() => {
        // если форма создана — сбрасываем значение поля answer
        form.resetFields?.(['answer']); // очистит поле answer
        // альтернативно: form.setFieldsValue({ answer: undefined });
    }, [currentQuestionIndex, form]);

    // ... (загрузка/ошибки/старт как у тебя)

    if (quizStarted && currentQuestionIndex >= questions.length) {
        return <ResultsComponent/>;
    }

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</p>;

    if (!quizStarted || !questions || questions.length === 0) {
        return (
            <div className={styles.startQuiz}>
                {!quizStarted ? (
                    <Button type="primary" size={"large"} onClick={() => { dispatch(startQuiz()); setQuizStarted(true); }}>
                        Начать Тест
                    </Button>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSubmit = (value: string | string[]) => {
        dispatch(questionAnswered({questionId: currentQuestion.id, answer: value}));
        // после отправки можно перейти на следующий вопрос — тогда resetFields сработает в useEffect
    };

    return (
        <Card title={`Вопрос ${currentQuestionIndex + 1}`}>
            <p>{currentQuestion.text}</p>

            {/* добавил form={form} и key для принудительного перемонтирования */}
            <Form
                form={form}
                key={`quiz-form-${currentQuestion.id}`}   // ключ по id вопроса — форс ремонт
                onFinish={(values) => handleAnswerSubmit(values.answer)}
            >
                {currentQuestion.type === 'radio' && (
                    <Form.Item name="answer" rules={[{required: true, message: 'Пожалуйста, выберите ответ!'}]}>
                        <Radio.Group
                            options={currentQuestion.options.filter(option =>
                                option && option.toString().trim() !== ''
                            )}
                        />
                    </Form.Item>
                )}

                {currentQuestion.type === 'input' && (
                    <Form.Item
                        name="answer"
                        rules={[{required: true, message: 'Пожалуйста, введите ваш ответ!'}]}
                        initialValue={undefined} // явно пустая начальная value
                    >
                        <Input />
                    </Form.Item>
                )}

                {currentQuestion.type === 'checkbox' && (
                    <Form.Item
                        name="answer"
                        rules={[{required: true, message: 'Пожалуйста, выберите хотя бы один вариант!'}]}
                    >
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
