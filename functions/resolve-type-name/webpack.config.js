const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/resolve-type-name.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "resolve-type-name.js",
    globalObject: "this",
    library: "@geronimus/resolve-type-name",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

