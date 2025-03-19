import path from "path";
import {BuildMode, buildWebpack} from '../../front-build-config/src';

const { ModuleFederationPlugin } = require("webpack").container;

type Environment = {
    mode: BuildMode,
    port: number,
}

export default (env: Environment) => {
    const config = buildWebpack({
        port: env.port ?? 3001,
        mode: env.mode,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            output: path.resolve(__dirname, 'build'),
        }
    });

    config.plugins?.push(
        new ModuleFederationPlugin({
            name: "remote",
            filename: "remoteEntry.js",
            exposes: {
              "./App": "./src/app",
            },
            shared: {
              react: { singleton: true },
              "react-dom": { singleton: true },
            },
          }),
    )

    return config;
}
   