const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/coalesce.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "coalesce.js",
    globalObject: "this",
    library: "@geronimus/coalesce",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

