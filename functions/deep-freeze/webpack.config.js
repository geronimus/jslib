const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/deep-freeze.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "deep-freeze.js",
    globalObject: "this",
    library: "@geronimus/deep-freeze",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

