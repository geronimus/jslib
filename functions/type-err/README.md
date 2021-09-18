# TypeErr( param, expectedType, actualType )

Returns a new instance of a `TypeError` with the error message:

    Parameter: _param_
      Expected: _expectedType_
      Actual: _actualType_

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

`expectedType` *string*

The type that is expected or allowed.

`actualType` *string*

The type that was found.

## Notes

If you do not provide meaningful arguments, the generated message will be meaningless.

