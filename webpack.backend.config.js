const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/server.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server-bundle.js',
  },
  node: {
    // Add libraries that do not need to be dependencies.
    net: 'empty',
    fs: "empty"
  },
  // See: https://github.com/webpack/webpack/issues/1576#issuecomment-475118999
  stats: {
    warningsFilter: warning => {
      // Critical dependency
      return RegExp("node_modules/express/lib/view.js").test(warning);
    }
  },
  externals: [nodeExternals()],
}
