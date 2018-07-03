const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { commonConfig, dist } = require('./webpack.common.js');

module.exports = function(env) {
  const nodeEnv = env && env.nodeEnv ? env.nodeEnv : 'development';
  const buildId = env && env.buildId ? env.buildId : nodeEnv;

  return merge(commonConfig({ nodeEnv, buildId }), {
    devtool: 'source-map',
    output: {
      publicPath: '/'
    },
    devServer: {
      disableHostCheck: true,
      contentBase: dist,
      compress: true,
      port: 8080,
      proxy: {
        '/dcatd_admin': {
          target: 'http://localhost:3000',
          secure: false,
          "changeOrigin": true,
          "logLevel": "debug",
        },
        '/grondexploitatie': {
          target: 'http://localhost:8000',
          secure: false,
          "changeOrigin": true,
          "logLevel": "debug",
        }
      },
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin({
        '__BUILD_ID__': JSON.stringify(buildId),
        'process.env': {
          'NODE_ENV': JSON.stringify(nodeEnv)
        }
      }),
      new ExtractTextPlugin('main.css')
    ]
  });
};
