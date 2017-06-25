// webpack production config
var path = require( 'path' ),
    helpers = require( './helpers' ),
    commonConfig = require( './webpack' ),
    merge = require( 'webpack-merge' ),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var overrides = {
    module: {
        loaders: [
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract ( 
                    "style-loader", 
                    "css-loader!sass-loader"
                ) 
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor","js/vendor-[hash].js"),
        new ExtractTextPlugin( "css/styles-[hash].css", { allChunks: true })
    ]
};

module.exports = merge( commonConfig, overrides );