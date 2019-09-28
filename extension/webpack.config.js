const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        config: './src/config.ts',
        panel: './src/panel.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {}
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/],
            }
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        },
        {
            test: /\.(scss|css)$/,
            use: [
                'vue-style-loader',
                {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: "config.html",
            chunks: ['config']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: "panel.html",
            chunks: ['panel']

        }),
        new VueLoaderPlugin(),
    ]
};