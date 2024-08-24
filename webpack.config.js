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
              name: "images/[name].[ext]", // Keep original file name and path
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/i, // Apply rule to MP3 files
        use: [
          {
            loader: "file-loader", // Use file-loader for MP3 files
            options: {
              name: "audio/[name].[ext]", // Keep original file name and path, place in the audio directory
            },
          },
        ],
      },
    ],
  },
  watch: true,
};
