import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const QuizForm = () => {
    const API_URL = __URL__;
    const [questions, setQuestions] = useState([{ id: 1, text: '', type: 'radio', options: ['', '', '', ''], correctAnswer: '' }]);
    const [quizName, setQuizName] = useState('');
    const [author, setAuthor] = useState('');

    const handleAddQuestion = () => {
        const newQuestion = { id: questions.length + 1, text: '', type: 'radio', options: ['', '', '', ''], correctAnswer: '' };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (value, index, key) => {
        const newQuestions = [...questions];
        newQuestions[index][key] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (value, index, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        const quizData = {
            id: Math.floor(Math.random() * 1000),
            name: quizName,
            author: author,
            questions: questions.map((q) => ({
                id: q.id.toString(),
                text: q.text,
                type: q.type,
                options: q.type !== 'input' ? q.options : [],
                correctAnswer: q.correctAnswer,
            })),
        };

        try {
            await axios.post(`${API_URL}`, quizData);
            message.success('Тест успешно создан!');
            setQuizName('');
            setAuthor('');
            setQuestions([{ id: 1, text: '', type: 'radio', options: ['', '', '', ''], correctAnswer: '' }]);
        } catch (error) {
            message.error('Ошибка при создании теста.');
            console.error(error);
        }
    };


    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Название теста" required>
                <Input value={quizName} onChange={(e) => setQuizName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Автор" required>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Item>
            {questions.map((question, index) => (
                <Card key={index} title={`Вопрос ${index + 1}`} style={{ marginBottom: 24 }}>
                    <Form.Item label="Текст вопроса" required>
                        <Input value={question.text} onChange={(e) => handleQuestionChange(e.target.value, index, 'text')} />
                    </Form.Item>
                    <Form.Item label="Тип вопроса" required>
                        <Select value={question.type} onChange={(value) => handleQuestionChange(value, index, 'type')}>
                            <Option value="radio">Один правильный ответ</Option>
                            <Option value="checkbox">Несколько правильных ответов</Option>
                            <Option value="input">Ответ текстом</Option>
                        </Select>
                    </Form.Item>
                    {question.type !== 'input' && (
                        <>
                            {question.options.map((option, optionIndex) => (
                                <Form.Item key={optionIndex} label={`Вариант ответа ${optionIndex + 1}`} required>
                                    <Input value={option} onChange={(e) => handleOptionChange(e.target.value, index, optionIndex)} />
                                </Form.Item>
                            ))}
                        </>
                    )}
                    <Form.Item label="Правильный ответ" required>
                        <Input value={question.correctAnswer} onChange={(e) => handleQuestionChange(e.target.value, index, 'correctAnswer')} />
                    </Form.Item>
                    {questions.length > 1 && (
                        <Button danger={true} onClick={() => handleRemoveQuestion(index)} icon={<MinusCircleOutlined />}>
                            Удалить вопрос
                        </Button>
                    )}
                </Card>
            ))}
            <Form.Item>
                <Button type='dashed' onClick={handleAddQuestion} icon={<PlusOutlined />}>
                    Добавить вопрос
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать Тест
                </Button>
            </Form.Item>
        </Form>
    );
};

export default QuizForm;
