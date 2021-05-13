const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/is-object.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "is-object.js",
    globalObject: "this",
    library: "@geronimus/is-object",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

