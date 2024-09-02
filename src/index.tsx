import {createRoot} from "react-dom/client";
import React, { StrictMode } from "react";
import './global.scss'
import {Provider} from "react-redux";
import {store} from "./app/store/StoreProvider";
import AppRouter from "./app/routes/AppRouter";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("No root element found");
}

const container = createRoot(rootElement);

container.render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </StrictMode>,
);

