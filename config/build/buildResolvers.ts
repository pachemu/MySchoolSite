import {ResolveOptions} from "webpack";
import path from "node:path";

export function buildResolvers () : ResolveOptions {
    return {
        extensions: [".tsx", ".ts", ".js", "jsx"],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    }

}