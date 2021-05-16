const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/option.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "option.js",
    globalObject: "this",
    library: "@geronimus/option",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

