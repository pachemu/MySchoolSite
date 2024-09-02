// @ts-ignore
import path from "path";

import buildWebpack from "./config/build-config";

type Env = {
    mode: "development" | "production" | "none";
    port: number;
    analyzer?: boolean;
    platform?: "dekstop" | "mobile";
    api: string;
};

export default (env: Env) => {
    const isDev = env.mode === "development";
    return buildWebpack({
        mode: isDev ? "development" : "production",
        paths: {
            public: path.resolve(__dirname, "public"),
            html: path.resolve(__dirname, "public", "index.html"),
            entry: path.resolve(__dirname, "src", "index.tsx"),
            output: path.resolve(__dirname, "dist"),
            src: path.resolve(__dirname, "src"),

        },
        port: env.port ?? 4400,
        analyzer: env.analyzer,
        platform: env.platform,
        api: env.api
    });
};
