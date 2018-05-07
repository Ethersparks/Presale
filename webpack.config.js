var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_ROOT = 'app';

var entries = [
     './' + APP_ROOT + '/client',
	 'webpack-dev-server/client?http://localhost:8080',
];

var loaders = [
    {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ],
        include: path.join(__dirname, APP_ROOT)
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, APP_ROOT)
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
        mode:"development",
        devtool: 'source-map',
        context: __dirname, // string (absolute path!)
        target:"web",
        entry: entries,
        output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
        },
        plugins: plugins,
        module : { rules: loaders },
        devServer: {
                proxy: { // proxy URLs to backend development server
                    '/api': 'http://localhost:3001'
                },
                contentBase: path.join(__dirname, 'app'),
                hot: true
        },
        resolve: {
            // options for resolving module requests
            // (does not apply to resolving to loaders)
            modules: [
              "node_modules",
              path.resolve(__dirname, "app")
            ],
            // directories where to look for modules
        
            extensions: [".js", ".json", ".jsx", ".css"],
        },
};
