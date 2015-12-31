const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': ['./web/static/css/app.scss', './web/static/js/app.js']
  },
  output: {
    path: './priv/static',
    filename: '/js/app.js'
  },
  resolve: {
    moduleDirectories: [__dirname + '/web/static/js'],
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js',
      containers: __dirname + '/web/static/js/containers',
      routes: __dirname + '/web/static/js/containers',
      projects: __dirname + '/web/static/js/projects',
      styles: __dirname + '/web/static/css',
      components: __dirname + '/web/static/js/components',
      layouts: __dirname + '/web/static/js/layouts',
      views: __dirname + '/web/static/js/views',
      actions: __dirname + '/web/static/js/redux/modules'
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?includePaths[]=' + __dirname + '/web/static/css'
      )
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
      { from: './web/static/assets'},
      { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
        to: 'js/phoenix_html.js'
      }
    ]),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    })
  ]
};
