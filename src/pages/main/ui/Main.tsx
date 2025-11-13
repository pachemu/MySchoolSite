import * as styles from './Main.module.scss';

import React from 'react'
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h1 className={styles.h1}>🎓 Добро пожаловать на сайт «Физика — класс!»</h1>
            <h2 className={styles.h2}>Изучай физику легко, наглядно и с интересом!</h2>
            <h3 className={styles.h3}>
                <span>
                    Этот сайт создан для школьников, которые хотят понимать физику, а не просто учить формулы.
                </span>
                <span>
                    Здесь ты найдёшь:
                </span>
                <span>
                    <Link to={'/conspects'}>🧠 Конспекты</Link> по основным темам школьного курса — просто и понятно.
                </span>
                <span>
                    <Link to={'/game'}>⚙️ Конструктор</Link> — интерактивные модели, которые помогают визуально разобраться в физических процессах.
                </span>
                <span>
                    <Link to={'/test'}>🧩Тесты</Link> — проверь свои знания и узнай, что стоит повторить.
                </span>
                <span>
                    <Link to={'/create/quiz'}>👩‍🏫 Учительский раздел</Link> — создание собственных тестов и контроль результатов учеников.
                </span>
            </h3>
        </div>
    )
}
export default Main