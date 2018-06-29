const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argvs) => {

    let publicPath = "/";
    if (argvs.mode === "production") {
        publicPath = "/react/"
    }
    return {
        entry: [
            './src/index.js'
        ],
        output: {
            publicPath: publicPath,
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
                template: 'public/index.html',
            }),
            new BundleAnalyzerPlugin()
            // new webpack.HotModuleReplacementPlugin(),

        ],

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: false,
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: true
                })
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            open: true,
            openPage: 'auth/sign-in'
        }
    }
};