import {RuleSetRule} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildBabelLoader} from "./babel/buildBabelLoader";
import {buildSWCLoader} from "./swc/buildSWCLoader";

export const buildLoaders = (isDevelopment: boolean): RuleSetRule[] => {
    const tsLoader = {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        options: {
            transpileOnly: isDevelopment,
        },
        exclude: /node_modules/,
    };

    const babelLoader = buildBabelLoader(isDevelopment)

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
    };
    const swcLoader = buildSWCLoader()
    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
    };

    return [swcLoader ,babelLoader, scssLoader, assetLoader, svgrLoader];
};