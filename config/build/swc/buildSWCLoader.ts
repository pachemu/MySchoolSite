export const buildSWCLoader = () => {
    const swcLoader = {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "swc-loader",
            options: {
                parseMap: true
            }
        }
    }

    return swcLoader
}