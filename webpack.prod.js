const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {commonConfig} = require('./webpack.common.js');

module.exports = function(env) {
  const nodeEnv = env && env.nodeEnv ? env.nodeEnv : 'production';
  const buildId = env && env.buildId ? env.buildId : nodeEnv;

  return merge(commonConfig({ nodeEnv, buildId }), {
    output: {
      filename: '[name].[chunkhash].js'
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer:[
        new UglifyJSPlugin({
          // Do not minify our legacy code (app.bundle.js); this doesn't work with
          // angular dependancy injection
          exclude: /app/,
          sourceMap: true
        }),
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version),
        '__BUILD_ID__': JSON.stringify(buildId),
        'process.env': {
          'NODE_ENV': JSON.stringify(nodeEnv)
        }
      }),
      new MiniCssExtractPlugin('main.[contenthash].css')
    ]
  });
};
