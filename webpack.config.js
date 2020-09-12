const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/app.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'commentPlugin',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}