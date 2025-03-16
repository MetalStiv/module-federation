import path from "path";
import { buildWebpack } from "./config/build/build-webpack";
import { BuildMode } from "./config/build/types/types";

type Environment = {
    mode: BuildMode,
    port: number,
}

export default (env: Environment) => {
    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode,
        paths: {
            entry: path.resolve(__dirname, 'front-host/src', 'index.tsx'),
            html: path.resolve(__dirname, 'front-host/public', 'index.html'),
            output: path.resolve(__dirname, 'build'),
        }
    })
}
   