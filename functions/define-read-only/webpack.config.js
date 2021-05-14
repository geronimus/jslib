const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/define-read-only.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "define-read-only.js",
    globalObject: "this",
    library: "@geronimus/define-read-only",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

