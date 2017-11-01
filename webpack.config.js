const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === "development"
});

const fontConfig = 'file-loader?name=[name].[ext]';
// const fontBundle = 'file-loader?name=assets/fonts/[name].[ext]';

// const fontConfig = isBundle ? fontBundle : fontLocal;

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader"  }, 
            { loader: "sass-loader" }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: fontConfig
      }
    ]
  },
  plugins: [ extractSass ]
};

module.exports = config;
