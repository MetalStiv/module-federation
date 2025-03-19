import path from "path";
import {BuildMode, buildWebpack} from '../../front-build-config/src';
import packageJson from './package.json';
import { remotes } from "./remote";

const { ModuleFederationPlugin } = require("webpack").container;

type Environment = {
    mode: BuildMode,
    port: number,
}

export default (env: Environment) => {
    const config =  buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            output: path.resolve(__dirname, 'build'),
        }
    });

    config.plugins?.push(new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',

        remotes: {
            microfront: remotes.microfront,
        },

        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                // requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config;
}
   