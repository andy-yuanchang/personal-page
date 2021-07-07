const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cfg = {
    entry: {
        'app': ['./src/index.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        assetModuleFilename: 'images/[name][ext]' // define assets output extension name
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            images: path.resolve(__dirname, './src/assets/images'),
            components: path.resolve(__dirname, './src/components'),
            js: path.resolve(__dirname, './src/js')
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     options: {
            //         fix: true,  // 是否讓 ESLint 直接 fix
            //     },
            // },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg)(\?.+)?$/,
                type: 'asset/resource',
            }
        ]
    },
    devServer: {
        port: 8080,
        https: false,
        contentBase: path.resolve(__dirname, 'dist'),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
        // publicPath: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
        new HtmlWebpackPlugin({
            template: "template.html"
        })
    ]
}

module.exports = cfg