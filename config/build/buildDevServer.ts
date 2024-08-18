import path from "path";

export const buildDevServer = (port: number, paths) => {
    const devServer = {
        port: port ?? 4400,
        open: true,
        hot: true,

        static: {
            directory: path.resolve(
                paths.output,
            ),
        },
    };
    return devServer

}