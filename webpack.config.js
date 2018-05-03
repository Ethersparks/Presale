var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_ROOT = 'app';

var entries = [
     './' + APP_ROOT + '/client',
     './' + APP_ROOT + '/media/index',
	 'webpack-dev-server/client?http://localhost:8080',
	 'webpack/hot/dev-server'
];

var loaders = [
    {
        test: /\.scss$/,
        loader: 'style!css?modules!sass',
        include: path.join(__dirname, APP_ROOT)
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, APP_ROOT)
    },
    {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name]-[hash:8].[ext]'
        },
    },
];

var plugins = [
     new webpack.HotModuleReplacementPlugin(),
     new HtmlWebpackPlugin({
		template: './' + APP_ROOT + '/index.html',
        favicon: './' + APP_ROOT + '/favicon.png'
	 })
];

module.exports = {
       devtool: 'source-map',
       entry: entries,
       output: {
      		path: path.join(__dirname, 'dist'),
      		filename: 'bundle.js'
      },
      plugins: plugins,
      module: {
		      loaders: loaders
      },
      devServer: {
		      contentBase: './dist',
		      hot: true
      }
};
