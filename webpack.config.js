const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const { mode } = argv
  const isProduction = mode === 'production'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction
        ? '[name].[contenthash].js'
        : 'main.js',
      clean: !!isProduction
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ],
    devServer: {
      open: true
    }
  }
}
