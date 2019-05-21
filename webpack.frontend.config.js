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
  devServer: {
    host: '0.0.0.0', // Required for docker
    // contentBase: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "assets")],
    watchContentBase: true,
    compress: true,
    port: 3000,
    public: 'nodejs-julianibarz499561.codeanyapp.com'
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
      filename: 'index.css',
    }),
    new CopyPlugin([
      { from: './src/index.html', to: './index.html' },
    ]),
  ]
}