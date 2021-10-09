# TypeErr( refName, expectedTypeName, foundInstance )

Returns a new instance of a `TypeError` with the error message:

> Reference name: *refName*
> &nbsp;&nbsp;Expected: *expectedTypeName*
> &nbsp;&nbsp;Actual: *either ***typeof foundInstance*** or, if foundInstance is of type ***object***, ***foundInstance.constructor.name****

## Examples

```javascript
const TypeErr = require( "@geronimus/type-err" );

function hello( who ) {

  if ( typeof who !== "string" )
    throw TypeErr( "who", "string", typeof who );
  else
    console.log( `Hello, ${ who }!` );
}
```

## Parameters

`param` *string*

The parameter, variable, or reference name where the invalid type was found.

`expectedTypeName` *string*

The type that is expected or allowed.

`foundInstance` *any*

The reference that you found to be of the wrong type.

The function will resolve its name for display in the error message. If the instance is a primitive value, then its `typeof` name will be displayed. If it is an object, then the message will display the name of its constructor.

## Notes

If you do not provide meaningful arguments, the generated message will be meaningless.

