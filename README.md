# `@geronimus/jslib`

A modular set of utility functions for JavaScript.

Each is intended to be published to the package manager independently, so that a user will only have to depend on the functions they use.



---

# isEmpty( value : any ) : boolean

Identifies whether the provided argument represents a value that does not hold any useful information. (eg, `null`, `undefined`, `NaN`, the empty string, or an empty Array, Map, Set or Object.)

## Examples

```javascript
const { isEmpty } = require( "@geronimus/isempty" );

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



---

# isNull( value : any ) : boolean

Tests a value for strict equality with `null` and `undefined`, and returns `true` if the value is equal with either.

## Examples

```javascript
const { isNull } = require( "@geronimus/isnull" );

isNull( null ) // => true
isNull( undefined ) // => true
isNull( {} ) // => false
isNull( [] ) // => false
isNull( 0 ) // => false
isNull( false ) // => false
```

## Parameters

`value` *any*

The value to test for strict equality with `null` or `undefined`.

