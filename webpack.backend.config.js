const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/server.js'],
  },
  node: {
    // To make __dirname point to current directory of output file.
    // See: https://bit.ly/2VVEEov
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server-bundle.js',
  },
  plugins: [
    new CopyPlugin([
      { from: './src/id_rsa', to: './' },
    ]),
  ],
  externals: [nodeExternals()],
}
