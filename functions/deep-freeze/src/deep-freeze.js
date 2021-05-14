const { isObject } = require( "@geronimus/is-object" );

function deepFreeze( obj ) {

  if ( !isObject( obj ) )
    return obj;
  else {
  
    const result = {};

    Object.getOwnPropertyNames( obj )
      .forEach( key => {
        result[ key ] = deepFreeze( obj[ key ] );
      });

    return Object.freeze( obj );
  }
}

module.exports = { deepFreeze };

