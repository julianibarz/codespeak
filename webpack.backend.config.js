const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
  externals: [nodeExternals()],
}
