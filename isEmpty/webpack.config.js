const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/isEmpty.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "isEmpty.js",
    globalObject: "this",
    library: "@geronimus/isempty",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

