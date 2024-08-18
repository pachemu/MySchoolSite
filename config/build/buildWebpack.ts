import {buildLoaders} from "./buildLoaders";
import {Configuration} from "webpack";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";
import {buildResolvers} from "./buildResolvers";
import {Options} from "../types/types";
import { WebpackDevServerOptions } from "webpack-cli";

export const buildWebpack = ({mode, paths, analyzer, platform, port} : Options) : Configuration => {
    const isDevelopment = mode === "development";
    const config = {
        stats: {
            errorDetails: true,
        },
        mode: mode,
        entry: paths.entry,
        devServer: isDevelopment ? buildDevServer(port, paths) : undefined,
        output: {
            path: paths.output,
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        devtool: isDevelopment ? 'inline-source-map' : 'source-map',
        module: {
            rules: buildLoaders(isDevelopment),
        },
        plugins: buildPlugins({paths, mode, analyzer, platform, port}),
        resolve: buildResolvers(),
        watchOptions: {
            ignored: /node_modules/,
        }
    };
    return config
}