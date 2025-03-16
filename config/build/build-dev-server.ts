import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export const buildDevServer: (options: BuildOptions) => DevServerConfiguration = (options) => ({
    port: options.port ?? 3000,
    open: false
})