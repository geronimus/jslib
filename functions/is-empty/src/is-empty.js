const isNull = require( "@geronimus/is-null" );

function isEmpty( value ) {
  return isNull( value ) ||
    ( typeof value === "number" && Number.isNaN( value ) ) ||
    ( typeof value === "string" && value === "" ) ||
    ( Array.isArray( value ) && value.length === 0 ) ||
    ( value instanceof Map && value.size === 0 ) ||
    ( value instanceof Set && value.size === 0 ) ||
    (
      typeof value === "object" &&
        value.constructor.name === "Object" &&
        Object.keys( value ).length === 0
    );
}

module.exports = isEmpty;

