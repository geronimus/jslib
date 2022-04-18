const isObject = require( "@geronimus/is-object" );
const TypeErr = require( "@geronimus/type-err" );

function defineReadOnly( obj, propertyMap ) {

  validate( obj, propertyMap );

  const enumerable = true;

  Object.getOwnPropertyNames( propertyMap )
    .forEach( key => {
      const { get, set, value } = findDescriptors(
        Object.getOwnPropertyDescriptor( propertyMap, key )
      );

      if ( value !== undefined )
        defineDataProperty( obj, key, value );
      else
        defineAccessorProperty( obj, key, get, set );
    });

  return obj;

  function defineAccessorProperty( obj, key, get, set ) {

    Object.defineProperty(
      obj,
      key,
      { enumerable, get, set }
    );
  }

  function defineDataProperty( obj, key, value ) {

    Object.defineProperty(
      obj,
      key,
      { enumerable, value }
    );
  }

  function findDescriptors( descObj ) {

    const result = {};

    [ "get", "set", "value" ]
      .forEach( prop => {
        if ( Object.getOwnPropertyNames( descObj ).includes( prop ) )
          result[ prop ] = descObj[ prop ];
        else
          result[ prop ] = undefined;
      });

    return result;
  }

  function validate( obj, propertyMap ) {

    if ( !isObject( obj ) )
      throw TypeErr( "obj", "object", obj );
    else if ( Object.isFrozen( obj ) )
      throw new TypeError( "The object passed as `obj` must not be frozen." );
    else if ( !isObject( propertyMap ) )
      throw TypeErr( "propertyMap", "object", propertyMap );
  }
}

module.exports = defineReadOnly;

