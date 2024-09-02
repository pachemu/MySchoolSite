// src/services/quizService.js

import axios from 'axios';

const API_URL = __URL__;

export const createQuiz = async (name, author, questions) => {
    try {
        const response = await axios.post(API_URL, { name, author, questions });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error}`);
    }
};

export const getQuizzes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error}`);
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error}`);
    }
};

export const updateQuiz = async (id, name, author, questions) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name, author, questions });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error}`);
    }
};

export const deleteQuiz = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error}`);
    }
};
