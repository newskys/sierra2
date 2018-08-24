const path = require('path'); // node.js 모듈로써, app이 동작하는 os에 따라서 path를 설정한다.
// const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const PORT = 3000;

module.exports = {
    // 가장 처음 읽을 스크립트파일
    // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
    entry: './src/index.js',
    mode: "development",

    // 파일을 합치고 ./public/bundle.js 에 저장한다.
    output: {
        path: __dirname + '/../../resources/static',
        filename: 'bundle.js'
    },

    devServer: {
        // localhost 호출시, host옵션을 제거해준다.
        host: "localhost",
        port: PORT,
        open: true
    },

    // ES6 문법과 JSX 문법을 사용한다
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', // process.env.NODE_ENV로 js에서 불러올 수 있다. NODE_ENV를 따로 지정하지 않으면 기본값
            DEBUG: false
        }),
    ],

    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"]
    }
};