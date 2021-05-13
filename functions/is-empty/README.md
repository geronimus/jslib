# isEmpty( value )

Identifies whether the provided argument represents a value that does not hold any useful information. (eg, `null`, `undefined`, `NaN`, the empty string, or an empty Array, Map, Set or Object.)

## Examples

```javascript
const { isEmpty } = require( "@geronimus/is-empty" );

isEmpty( null ); // => true
isEmpty( undefined ); // => true
isEmpty( false ); // => false
isEmpty( NaN ); // => true
isEmpty( 0 ); // => false
isEmpty( "" ); // => true
isEmpty( " " ); // => false
isEmpty( {} ); // => true
isEmpty( [] ); // => true
isEmpty( [ {} ] ); // => false
isEmpty( new Map() ); // => true
isEmpty( new Set() ); // => true
```

## Parameters

`value` *any*

The value to test for emptiness.

