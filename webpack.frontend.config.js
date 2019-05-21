const path = require('path');

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
    contentBase: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "assets")],
    watchContentBase: true,
    compress: true,
    port: 3000,
    public: 'nodejs-julianibarz499561.codeanyapp.com'
  },
  devtool: 'inline-source-map',
}