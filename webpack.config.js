/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path                 = require("path");
const PugPlugin            = require("pug-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
// const StylelintPlugin      = require("stylelint-webpack-plugin");

// const ESLintWebpackPlugin  = require("eslint-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: "./src/index.pug"},
    output: {
            path: path.join(__dirname, 'dist/'),
            publicPath: '/',
            clean: true
    },
    mode: 'development',                                                 // после окончания разработки поменять на "production" для минификации бандла JS
    plugins: [
        // new MiniCssExtractPlugin(),
        
        // new ESLintWebpackPlugin({fix: true}),
        // new StylelintPlugin({fix: false}),
        new PugPlugin({
            // pretty: true,                                              // formatting HTML, useful for development mode
            js: {
              filename: 'assets/js/[name].[contenthash:8].js',          // output filename of extracted JS file from source script
            },
            css: {
              filename: 'assets/css/[name].[contenthash:8].css',        // output filename of extracted CSS file from source style
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["css-loader", "postcss-loader", "sass-loader"],
                // options: {url: false}
            },
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
                // options: {pretty: true}                         // после окончания разработки поменять на false для минификации файла html
            },
            {
                test: /\.(png|svg|jpeg|jpg)$/,
                type: "asset/resource"
            }
        ],
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
      },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/"),
        },
        hot: true,
        open: true
    },
};