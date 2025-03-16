import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildLoaders: (options: BuildOptions) => ModuleOptions['rules']  = (options) => {
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // options: {
        //     modules: true,
        //     localIdentName: options.mode === 'development' ? '[name]_[hash:8]' : '[hash:8]',
        // }
    };
    
    return [
        tsLoader,
        cssLoader,
    ]
}