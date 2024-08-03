const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BannerPlugin } = require('webpack');

module.exports = {
    target: 'node',
    entry: './src/index.ts',
    output: {
        filename: 'cli.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: {node: 'current'}}],
                            '@babel/preset-typescript'
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new BannerPlugin({
            banner: "#!/usr/bin/env node",
            raw: true
        })
    ],
    devtool: 'inline-source-map',
};