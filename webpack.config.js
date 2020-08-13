const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/main.ts",
    target: 'node',
    context: __dirname,
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'Speech-recogonization-api.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'package.json' },
            { from: 'package-lock.json' },
            { from: './src/config/*.json', to: 'config', flatten: true }
        ])
    ],
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [{ loader: 'ts-loader' }]
            }

        ],
    },
};