const path = require('path'); // node.js 모듈로써, app이 동작하는 os에 따라서 path를 설정한다.
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
//__dirname : 현재 파일의 디렉토리

const PORT = 3000;
console.log(__dirname);
module.exports = {
    // wevpack4) development: 개발용, production: 배포용(알아서 최적화가 일어난다.), default: none
    mode: 'production',
    devServer: {
        // localhost 호출시, host옵션을 제거해준다.
        host: "localhost",
        port: PORT,
        open: true,
        // contentBase: "./src"
    },
    entry: {
        app: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path:  path.resolve(__dirname, "./static/"),
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        splitChunks: {
            //production mode일때, UglifyjsWebpackPlugin가 자동으로 설정된다.
            cacheGroups: {
                vender: { // vender 파일 생성
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vender',
                    enforce: true
                }
            }}
    },
    plugins: [
        new HtmlWebPackPlugin({ //index.html에 빌드된 js를 넣어준다.
            template: path.resolve(__dirname,"./src/index.html"),
            filename:  path.resolve(__dirname,"./static/index.html")
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', // process.env.NODE_ENV로 js에서 불러올 수 있다. NODE_ENV를 따로 지정하지 않으면 기본값
            DEBUG: false
        })
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"]
    }
};