var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');

['skirts'].forEach(function(chunk) {
	var cb = function() {

	}
	fs.unlink(process.cwd() + "src/assets/js/" + chunk + ".js", cb)
	fs.unlink(process.cwd() + "src/assets/js/" + chunk + ".js.map", cb)
});

module.exports = {
	entry: {
		skirts: ["./src/components/skirts/skirts.jsx"],
		sewing: ["./src/components/sewing/index.jsx"]
	},
	output: {
		path: path.resolve(__dirname,'src/assets/js/'),
		filename: "[name].js",
		libraryTarget: 'var',
		library: '[name]'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					// loose=true for IE9 support
					presets: [[ 'es2015', {"loose":true}], ['react']]
				}
			}
			// Extract css files
			// {
			// 	test: /\.css$/,
			// 	loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			// }
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/), // excludes all non english locales reducing our unminified asset size by 300kb
		new webpack.optimize.CommonsChunkPlugin({
			name: "skirts",
			chunks: ["skirts"]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "sewing",
			chunks: ["sewing"]
		}),
	]
}