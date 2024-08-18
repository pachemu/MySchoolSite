import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop/LazyShop";
import About from "./pages/About/LazyAbout";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("No root element found");
}

const container = createRoot(rootElement);
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: (
                    <Suspense fallback="loading...">
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/shop",
                element: (
                    <Suspense fallback="loading...">
                        <Shop />
                    </Suspense>
                ),
            },
        ],
    },
]);

container.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

// Добавляем поддержку HMR
if (module.hot) {
    module.hot.accept("./components/App", () => {
        container.render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>,
        );
    });
}
