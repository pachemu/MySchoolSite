import {createRoot} from "react-dom/client";
import React, { StrictMode } from "react";
import {AppRouter} from "./app/routes";
import './global.scss'

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("No root element found");
}

const container = createRoot(rootElement);

container.render(
    <StrictMode>
        <AppRouter/>
    </StrictMode>,
);

