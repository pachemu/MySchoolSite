import React, {useRef} from 'react'
import * as styles from './Game.module.scss'
import {Button} from "antd";
export const Game = () => {
    const embedRef = useRef(null); // Создаем реф для ссылки на контейнер с embed

    const toggleFullscreen = () => {
        const container = embedRef.current; // Получаем доступ к контейнеру

        if (!document.fullscreenElement) {
            // Если не в полноэкранном режиме, запрашиваем переход
            container.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            // Если уже в полноэкранном режиме, выходим из него
            document.exitFullscreen();
        }
    };
    return (
        <div>
            <div id="embedContainer" ref={embedRef} style={{width: '600px', height: '400px', position: 'relative'}}>
                <embed
                    src="https://falstad.com/circuit/circuitjs.html" // Замените на путь к вашему документу
                    style={{width: '100%', height: '100%'}}
                />
            </div>
            <Button onClick={toggleFullscreen}>
                Включить во весь экран
            </Button>
        </div>
)
}
export default Game