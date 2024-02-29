/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path                 = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
// const HtmlWebpackPlugin    = require("html-webpack-plugin");
const ESLintWebpackPlugin  = require("eslint-webpack-plugin");
const StylelintPlugin      = require("stylelint-webpack-plugin");
const PugPlugin            = require("pug-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
    },
    mode: 'development',                                // после окончания разработки поменять на "production" для минификации бандла JS
    plugins: [
        new MiniCssExtractPlugin(),
        // new HtmlWebpackPlugin({
        //                 template: "./src/index.pug",
        //                 filename: "index.html"}),
        new ESLintWebpackPlugin({fix: true}),
        new StylelintPlugin({fix: true}),
        new PugPlugin({
                        template: "./src/index.pug",
                        filename: "index.html"})

    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {pretty: true}                         // после окончания разработки поменять на false для минификации файла html
            }
        ],
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
      },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        hot: true
    },
};