const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: "web",
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index-bundle.js",
  },
  module:{
    rules:[
              {
                  test:/\.css$/,
                  use:['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
              }
         ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles.css',
    }),
    new CopyPlugin([
      { from: './src/index.html', to: './index.html' },
    ]),
  ]
}