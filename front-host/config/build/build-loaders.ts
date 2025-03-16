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
        test: /\.css$/,
        oneOf: [
          {
            test: /\.module\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    namedExport: false,
                    exportLocalsConvention: 'as-is',
                  },
                },
              },
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      };
    
    return [
        cssLoader,
        tsLoader,
    ]
}