module.exports = {
  mode: "development",
  devtool: "sourcemap",
  entry: ["./src/main.js"],
  output: {
    filename: "main.js",
    path: __dirname + '/public'
  }
};
