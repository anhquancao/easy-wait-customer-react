const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./customer.html",
    hash: true
});

const namedModulesPlugin = new webpack.NamedModulesPlugin();
const hotModuleReplacement = new webpack.HotModuleReplacementPlugin();

module.exports = {
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [htmlPlugin, namedModulesPlugin, hotModuleReplacement,new MinifyPlugin(),new UglifyJsPlugin()],
    output: {
        filename: 'customer/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
};