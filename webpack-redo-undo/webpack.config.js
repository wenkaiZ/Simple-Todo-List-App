var path = require('path');
var webpack = require('webpack');
const devServerPort = 3000;

//Dev Server configuration
devServerConfig = {
    port: devServerPort,
    publicPath: './dist/',
    hotOnly: true,
    open: true,
    openPage: './index.html',
    public: 'localhost:' + devServerPort,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    contentBase: path.resolve(__dirname, 'dist'),
    clientLogLevel: 'info',
    stats: {
        colors: true,
        assets: true,
        warnings: true
    }
};
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: ['es2015']
            }
        }]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
]
  },
//   stats: {
//       colors:true
//   },
//   devtool: 'source-map'
devServer: devServerConfig
};
