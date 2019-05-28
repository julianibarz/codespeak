const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/server.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server-bundle.js',
  },
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
  externals: [nodeExternals()],
}
