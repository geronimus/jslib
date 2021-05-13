const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/is-null.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "is-null.js",
    globalObject: "this",
    library: "@geronimus/is-null",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

