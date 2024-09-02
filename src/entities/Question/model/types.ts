export interface Question {
    id: string;
    text: string;
    type: 'input' | 'radio' | 'checkbox';
    options?: string[]; // Опционально для 'radio' и 'checkbox'
    correctAnswer: string | string[]; // Может быть строкой или массивом строк в зависимости от типа вопроса
    userAnswer?: string | string[]; // Для хранения ответа пользователя
}
