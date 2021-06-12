const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true,
    },
    entry: './src/index.js',
    target: 'node',
    mode: 'production',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        node: "current"
                                    }
                                }
                            ]
                        ],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    },
                },
            },
        ],
    },
    plugins: [
        new NodemonPlugin({
            watch: path.resolve('./dist'),
            ignore: ['*.js.map'],
            verbose: false,
            ext: 'js,njk,json',
        }),
    ],
};
