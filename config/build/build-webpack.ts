import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import { buildResolvers } from "./build-resolvers";
import { buildLoaders } from "./build-loaders";
import { buildPlugins } from "./build-plugins";
import { buildDevServer } from "./build-dev-server";

export const buildWebpack: (options: BuildOptions) => Configuration = (options) => {
    return ({
        mode: options.mode ?? 'development',
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js'
        },
        resolve: buildResolvers(options),
        module: {
            rules: buildLoaders(options),
        },
        plugins: buildPlugins(options),
        devServer: buildDevServer(options),
    });
};