import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export const buildResolvers: (options: BuildOptions) => Configuration['resolve'] = () => ({
    extensions: ['.tsx', '.ts', '.js', 'css'],
})