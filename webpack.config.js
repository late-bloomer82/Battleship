const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader", // Use babel-loader for .js files
          options: {
            presets: ["@babel/preset-env"], // Use @babel/preset-env for ES6+ to ES5 conversion
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Apply rule to image files
        use: [
          {
            loader: "file-loader", // Use file-loader for image files
            options: {
              name: "[path][name].[ext]", // Keep original file name and path
            },
          },
        ],
      },
    ],
  },
  watch: true,
};
