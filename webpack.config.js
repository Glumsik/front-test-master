const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    devtool: false,
    entry: ["./src/js/tabs.js"],
    output: {
        filename: "js/scripts.min.js",
        chunkFilename: "js/[name].min.js"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: "vendor"
                }
            }
        }
    },

    plugins: [
        new CopyPlugin([{ from: "./src/index.html" }]),
        new webpack.SourceMapDevToolPlugin({
            filename: "js/scripts.min.js.map",
            exclude: ["js/vendor.min.js"]
        }),
        new webpack.SourceMapDevToolPlugin({
            test: /\.s?[ac]ss$/,
            filename: "css/styles.min.css.map"
        }),
        new MiniCssExtractPlugin({
            filename: "css/styles.min.css"
        })
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { esModule: true }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    devServer: { contentBase: path.join(__dirname, "dist"), port: 3005 }
};
