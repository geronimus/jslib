const thisFile = "range.js";

function range( lowerBound, upperBound ) {
  validateArgs( arguments );

  const low = validateNumber( "lowerBound", lowerBound );
  const high = validateNumber( "upperBound", upperBound );

  validateRange( low, high );

  const exclusiveMax = high + 1;
  const length = exclusiveMax - low;
  const result = new Array( length );
  
  for ( let index = 0, value = low; index < length; index++, value++ ) {
    result[ index ] = value;
  }

  return result;
}

function validateArgs( args ) {
  if ( args.length < 1 )
    noArg( "lowerBound" );
  else if ( args.length < 2 )
    noArg( "upperBound" );

  function noArg( argName ) {
    throw new ReferenceError(
      `Missing argument: ${ argName }`,
      thisFile,
      4
    );
  }
}

function validateNumber( argName, argValue ) {
  const errorLine =
    argName === "lowerBound" ? 6 : 7;

  if ( typeof argValue !== "number" )
    throw new TypeError(
      `Invalid argument: ${ argName }\n  ` +
        "Expected: A number value.\n  " +
        `Found: ${ typeof argValue } : ${ argValue }`,
      thisFile,
      errorLine
    );

  const result =  Math.floor( argValue );

  if ( !Number.isSafeInteger( result ) )
    throw new RangeError(
      `Invalid argument: ${ argName }\n  ` +
        `Expected: A "safe" integer between ${ Number.MIN_SAFE_INTEGER } ` +
        `and ${ Number.MAX_SAFE_INTEGER }.\n  ` +
        `Found: ${ argValue }`,
      thisFile,
      errorLine
    );

  return result;
}

function validateRange( low, high ) {
  if ( !( high >= low ) )
    throw RangeError(
      `upperBound (${ high }) must be greater than or equal to lowerBound ` +
        `(${ low }).`,
      thisFile,
      9
    );

  // 2^32 - 1, according to Mozilla Developer Network JavaScript documentation.
  const ARRAY_MAX = 4294967295;

  if ( ( ( high + 1 ) - low ) > ARRAY_MAX )
    throw RangeError(
      "The number of values between upperBound and lowerBound must not " +
        `exceed ${ ARRAY_MAX }\n  ` +
        `lowerBound: ${ low }\n  ` +
        `upperBound: ${ high }\n  ` +
        `Number of values: ${ (high + 1 ) - low }`,
      thisFile,
      9
    );
}

module.exports = range;

