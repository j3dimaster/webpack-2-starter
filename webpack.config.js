const path = require('path')
const webpack = require('webpack') // to access built-in plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // installed via npm
const CleanWebpackPlugin = require('clean-webpack-plugin')
const serverConfig = require('./server.config.js')// webpack-dev-server config file

const extractPlugin = new ExtractTextPlugin({filename: 'main.css'})
const htmlWebpack = new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html'})
const clean = new CleanWebpackPlugin(['dist'])

const config = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: "cheap-source-map",
  context: __dirname,
  devServer: serverConfig,
  module: {
    rules: [{
       test:/\.(js|jsx)$/,
       use: [{ loader: 'babel-loader', options: { presets: ['es2015'] }}]
      }, {
        test: /\.scss/,
        use: extractPlugin.extract({
          use: [{ loader: 'css-loader', options: { importLoaders: 1 }}, 'postcss-loader' , 'sass-loader'] 
        })
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test:/\.(jpg|png)$/,
        use: [{loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'img/'}}]
      }, {
        test:/\.html$/,
        use: [{loader: 'file-loader',options: {name: '[name].[ext]'}}],
        exclude: path.resolve(__dirname, 'src/index.html')
      }
    ]
  },
  plugins: [extractPlugin, htmlWebpack, clean]
}

module.exports = config