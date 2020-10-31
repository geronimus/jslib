const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/randomInt.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "randomInt.js",
    globalObject: "this",
    library: "@geronimus/randomint",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

