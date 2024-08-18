import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
import { Options } from "../types/types";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export const buildPlugins = ({ paths, mode, analyzer, platform }: Options): Configuration["plugins"] => {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            title: "My App",
            inject: "body", // Вставлять скрипты в body для корректной работы HMR
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __MODE__: JSON.stringify(mode),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "[contenthash].css",
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') }
            ],
        }));
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
    }

    return plugins;
};