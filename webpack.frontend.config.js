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
  devServer: {
    host: '0.0.0.0', // Required for docker
    contentBase: [path.resolve(__dirname, "dist")],
    watchContentBase: true,
    compress: true,
    allowedHosts: [
      'nodejs-julianibarz499561.codeanyapp.com',
      'codespeak.julianibarz.com',
      'codespeak.appspot.com',
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles.css',
    }),
    new CopyPlugin([
      { from: './src/index.html', to: './index.html' },
    ]),
  ]
}