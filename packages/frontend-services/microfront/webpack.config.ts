import path from "path";
import {BuildMode, buildWebpack} from '../../front-build-config/src'

type Environment = {
    mode: BuildMode,
    port: number,
}

export default (env: Environment) => {
    return buildWebpack({
        port: env.port ?? 3001,
        mode: env.mode,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            output: path.resolve(__dirname, 'build'),
        }
    })
}
   