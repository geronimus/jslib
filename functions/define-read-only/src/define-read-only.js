const { isObject } = require( "@geronimus/is-object" );
const { TypeErr } = require( "@geronimus/type-err" );

function defineReadOnly( obj, propertyMap ) {

  if ( !isObject( obj ) )
    throw TypeErr( "obj", "object", typeof obj );
  else if ( Object.isFrozen( obj ) )
    throw new TypeError( "The object passed as `obj` must not be frozen." );
  else if ( !isObject( propertyMap ) )
    throw TypeErr( "propertyMap", "object", typeof propertyMap );
  else {

    Object.getOwnPropertyNames( propertyMap )
      .forEach( prop => {
        Object.defineProperty(
          obj,
          prop,
          {
            enumerable: true,
            value: propertyMap[ prop ]
          }
        );
      });

    return obj;
  }
}

module.exports = { defineReadOnly };

