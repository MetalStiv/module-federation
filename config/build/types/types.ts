export type BuildMode = 'development' | 'production';

export type BuildPaths = {
    entry: string,
    html: string,
    output: string,
}

export type BuildOptions = {
    port: number,
    mode: BuildMode,
    paths: BuildPaths,
}