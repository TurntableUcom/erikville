var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: 'build.js'
  },
  plugins: [
      new ExtractTextPlugin("assets/css/styles.css"),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([{ from: './src/assets', to: './assets' }])
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
       test: /\.(png|jp(e*)g|gif|svg)$/,
       loader: 'file-loader',
       options: {
           name: '/assets/images/[name].[ext]?[hash]'
       }
      },
      {
          test: /\.(html)$/,
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
      },
      {
          test: /\.(s*)css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
              /*
              use: [
                {loader: 'css-loader', options: {sourceMap: true}},
                {loader: 'sass-loader', options: {sourceMap: true}}
              ]
              */
          })
      },
      {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8000, // Convert fonts < 8kb to base64 strings
                  name: 'assets/fonts/[name].[ext]'
              }
          }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    */
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
