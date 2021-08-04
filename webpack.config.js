const isDevelopment = process.env.NODE_ENV === 'development';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new MomentLocalesPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: isDevelopment ? 'server' : 'disabled' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/resources/images/favicon.ico' },
      ]
    })
  ],
  resolve: {
    extensions: ['.js','.jsx', '.scss']
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              implementation: require("sass"),
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devtool: false,
};
