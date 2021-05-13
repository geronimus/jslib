const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/is-empty.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "is-empty.js",
    globalObject: "this",
    library: "@geronimus/is-empty",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

