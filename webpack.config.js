const isDevelopment = process.env.NODE_ENV === 'development';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
  ],
  resolve: {
    extensions: ['.js','.jsx', '.scss']
  },
  output: {
    filename: 'bundle.js',
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
      }
    ],
  },
  devtool: isDevelopment ? 'eval' : false,
};
