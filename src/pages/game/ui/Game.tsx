import React, {useRef, useState} from 'react'
import * as styles from './Game.module.scss'
import {Button} from "antd";
export const Game = () => {
    const embedRef = useRef(null);
    const toggleFullscreen = () => {
        const container = embedRef.current;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };
    return (
        <div>
            <div id="embedContainer" ref={embedRef} style={{width: '80vw', height: '25vw'}}>
                <iframe
                    loading='lazy'
                    src="https://falstad.com/circuit/circuitjs.html"
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