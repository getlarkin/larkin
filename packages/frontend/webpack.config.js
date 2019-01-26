const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isProduction = process.env.NODE_ENV === 'production'

const webpackConfig = {
  entry: './src/index.tsx',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? '' : 'source-map',
  output: {
    filename: isProduction ? 'bundle.[hash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', 'mjs'],
    alias: {
      '@larkin/frontend': path.resolve(__dirname, './src/'),
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 2075,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isProduction ? '[name].[hash].[ext]' : '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

module.exports = webpackConfig
