const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/random-int.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "random-int.js",
    globalObject: "this",
    library: "@geronimus/random-int",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

