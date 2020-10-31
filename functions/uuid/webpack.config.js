const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/uuid.js",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "uuid.js",
    globalObject: "this",
    library: "@geronimus/uuid",
    libraryTarget: "umd"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
}

