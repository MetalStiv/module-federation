import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const buildPlugins: (options: BuildOptions) => Configuration['plugins'] = (options) => {
    const htmlWebPlugin = new HtmlWebpackPlugin({template: options.paths.html});
    
    const miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
    })

    const result: Configuration['plugins'] = [
        htmlWebPlugin,
        miniCssExtractPlugin
    ]

    if (options.mode === 'development') {
        result.push(new ReactRefreshWebpackPlugin());
    }

    return result
}