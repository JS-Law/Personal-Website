const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans dist folder on each build
    publicPath: "/", // Needed for React Router (optional now, helpful later)
  },

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        directory: path.resolve(__dirname, "src"),
      },
      {
        directory: path.resolve(__dirname, "src/content"),
        publicPath: '/content'
      }
    ],
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    liveReload: true,
    watchFiles: ["src/**/*"],
    historyApiFallback: true, // React Router: prevents 404 on refresh
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Add JSX support
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"], // So you can import without file extensions
  },

  watchOptions: {
    poll: 1000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/index.html",
    }),
  ],
};
