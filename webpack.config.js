const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProdaction = process.env.NODE_ENV === 'prodaction'

module.exports = {
   entry: './src/index.ts',
   mode: isProdaction ? 'production' : 'development',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|oft)$/i,
            type: 'asset/resource',
         },
      ],
   },

   plugins: [
      new CopyPlugin({
         patterns: [{ from: 'static', to: 'static' }],
      }),
      new HtmlWebpackPlugin({
         template: './index.html',
      }),
      new MiniCssExtractPlugin(),
   ],
   resolve: {
      extensions: ['.ts', '.js'],
   },
   optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
   },
   devtool: isProdaction ? 'hidden-source-map' : 'source-map',
}
