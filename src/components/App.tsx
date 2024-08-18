import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import * as styles from './App.module.scss';
import Document from '../assets/svg.png';

export const App= () => {
    const [count, setCount] = useState<number>(0);
    const handleIncrement = () => {
        setCount(count + 1);
    };
    return (
        <div data-testid="DebchikLox">
            <img alt={'Document'} src={Document} />
            <h1 className={styles.button}>Hellssssso HMR!</h1>
            <h2>Counter {count}</h2>
            <button onClick={handleIncrement}>Increment</button>
            <Link to={'about'}><h1>About</h1></Link>
            <Link to={'shop'}><h1>Shop</h1></Link>
            <Outlet />
        </div>
    );
};

export default App;
