const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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
            new UglifyJsPlugin({
                sourceMap: true,
            }),
            new BundleAnalyzerPlugin()
            // new webpack.HotModuleReplacementPlugin(),

        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0 // This is example is too small to create commons chunks
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
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