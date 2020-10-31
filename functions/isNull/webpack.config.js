const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/isNull.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "isNull.js",
    globalObject: "this",
    library: "@geronimus/isnull",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

