import { lazy } from 'react';
import React from 'react'
const LazyQuiz = lazy(() =>
    import('./ui/QuizPage')
);

export default LazyQuiz