const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:6].js'
  },
  resolve: {
    alias: {
      'pages': path.resolve(__dirname, 'src', 'pages'),
      'routes': path.resolve(__dirname, 'src', 'routes'),
      'assets': path.resolve(__dirname, 'src', 'assets'),
      'utils': path.resolve(__dirname, 'src', 'utils')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader?cacheDirectory'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: 'assets',
              esModule: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          'html-withimg-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: 1,
          minSize: 0,
          minChunks: 1
        }
      }
    }
  }
};
