var path = require("path");
var webpack = require("webpack");
const devServerPort = 3000;
//css文件提取器需要的模块
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var htmlWebpackPlugin = require('html-webpack-plugin');
//postcss-loader 需要的配置项
//var precss = require("precss");
//var autoprefixer = require("autoprefixer");

devServerConfig = {
  port: devServerPort,
  publicPath: "./dist/",
  hotOnly: true,
  open: true,
  openPage: "./index.html",

  public: "localhost:" + devServerPort,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  contentBase: __dirname + '/dist', ///!!!!!remind cannot get add this line code 
  clientLogLevel: "info",
  stats: {
    colors: true,
    assets: true,
    warnings: true
  }
};
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, 'node_modules/'), /// or will exceed the size 
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { compact: false }
      }
    ]

    // 编译css并自动添加css前缀 并将css提取出
  },
  
  devServer: devServerConfig,
  
};
