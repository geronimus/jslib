const { randomInt } = require( "@geronimus/randomint" );
const { range } = require( "@geronimus/range" );

function uuid() {
  const timeLow = stringifyBytes(
    randomByteArray( 4 )
  );
  const timeMid = stringifyBytes(
    randomByteArray( 2 )
  );
  // RFC 4122 specifies that the four most significant bits in the first octet
  // of this two-octet sequence must represent the variant of this UUID -
  // that is - 4 or 0100 in binary.
  //
  // Therefore, the first byte must be between binary 0100 0000 and 0100 1111 -
  // meaning decimal 64 and 79.
  const timeHighAndVersion = stringifyBytes(
    [ randomInt( 64, 79 ), randomByte() ]
  );
  // RFC 4122 specifies that the two most significant bits in this octet must
  // be 1 and 0 respectively. This means a value between binary 1000 0000 and
  // 1011 1111 - meaning decimal 128 and 191.
  const clockSeqHighAndReserved = stringifyBytes(
    [ randomInt( 128, 191 ) ]
  );
  const clockSeqLow = stringifyBytes(
    [ randomByte() ]
  );
  const node = stringifyBytes(
    randomByteArray( 6 )
  );

  return [
    timeLow,
    timeMid,
    timeHighAndVersion,
    [ clockSeqHighAndReserved, clockSeqLow ].join( "" ),
    node
  ].join( "-" );
}

function randomByteArray( length ) {
  return range( 1, length )
    .map( slot => randomByte() ); // eslint-disable-line no-unused-vars
}

function randomByte() {
  return randomInt( 0, 255 );
}

function stringifyBytes( byteArray ) {
  return byteArray
    .map( decToHex )
    .join( "" );
}

function decToHex( byteValue ) {
  return byteValue.toString( 16 ).padStart( 2, "0" );
}

exports.uuid = uuid;

