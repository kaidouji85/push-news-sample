module.exports = {
  mode: "development",
  devtool: "sourcemap",
  entry: ["./src/sw.js"],
  output: {
    filename: "sw.js",
    path: __dirname + '/public'
  }
};
