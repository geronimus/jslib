const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/range.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "range.js",
    globalObject: "this",
    library: "@geronimus/range",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

