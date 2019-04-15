const path = require('path')

module.exports = {
  mode: 'development',
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    libraryTarget: "umd", // universal module definition
    path: __dirname + "/dist"
  },
  devtool: "sourceMap",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {test: /\.tsx$/, loader: "awesome-typescript-loader"},
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5000
  }
}