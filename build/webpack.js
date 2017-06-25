// webpack common config
var path = require( 'path' ),
    helpers = require( './helpers' ),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./src",
        vendor: [
            'three',
            'three-orbitcontrols-ts'
        ]
    },
    output: {
        path: path.join( helpers._root, "docs" ),
        filename: "js/app-[hash].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".ts", ".tpl.html", ".partial.html", ".scss"],
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" },
            { test: /\.partial\.html$/, loader: 'file-loader?name=partial/[name]-[hash].[ext]' },
            { test: /\.(jpg|png)$/, loader: 'file-loader?name=images/[name]-[hash].[ext]' },
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devServer: {
        inline: true,
        hot: false,
        port: 3000,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new CleanWebpackPlugin( 'app', { root: helpers._root } ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true,
        })
    ]
}