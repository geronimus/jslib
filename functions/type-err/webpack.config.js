const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/type-err.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "type-err.js",
    globalObject: "this",
    library: "@geronimus/type-err",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

