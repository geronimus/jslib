const resolveTypeName = require( "@geronimus/resolve-type-name" );

function TypeErr( refName, expectedTypeName, foundInstance ) {

  return new TypeError(
    `Reference name: ${ refName }\n` +
      `  Expected: ${ expectedTypeName }\n` +
      `  Found: ${ resolveTypeName( foundInstance ) }`
  );
}

module.exports = TypeErr;

