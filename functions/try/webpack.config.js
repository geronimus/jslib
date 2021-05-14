const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/try.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "try.js",
    globalObject: "this",
    library: "@geronimus/try",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

