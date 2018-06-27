const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        publicPath: '/customer/',
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "cheap-eval-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            camelCase: true,
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'public/index.html',
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        // new webpack.HotModuleReplacementPlugin(),

    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        open: true,
        openPage: 'customer/'
    }
};