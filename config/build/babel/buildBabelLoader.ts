import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export const buildBabelLoader = (isDevelopment) => {
    const babelPlugins = [
        require.resolve('react-refresh/babel'), [
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }]
    ].filter(Boolean)
    const isProd = !isDevelopment;
    const babelLoader = {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                plugins: isProd ? babelPlugins : undefined,
            },
        },
    };
    return babelLoader
}