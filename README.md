# `@geronimus/jslib`

A modular set of utility functions for JavaScript.

Each is intended to be published to the package manager independently, so that a user will only have to depend on the functions they end up using.

## Contents

- [coalesce](#coalesce--value1--value2------)
- [isEmpty](#isEmpty-value-)
- [isNull](#isNull-value-)
- [randomInt](#randomInt-lowerBound-upperBound-)



---

# coalesce( [ value1, [ value2, [ ... ] ] ] )

As in SQL, `coalesce()` returns its first argument that is neither `null` nor `undefined`.

## Examples

```javascript
const { coalesce } = require( "@geronimus/coalesce" );

const result = coalesce(
  couldProduceNull( option1 ),
  couldProduceNull( option2 ),
  "default result"
);
```

## Parameters

`value1` *any*, `value2` *any*, ...

Any number of values or expressions. The first that does not evaluate to `null` or `undefined` will be returned.



---

# isEmpty( value )

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

# isNull( value )

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



---

# randomInt( lowerBound, upperBound )

Generates a pseudo-random integer value between the bounds that you specify. (Both inclusive.)

If either number has a decimal part, it will be truncated.

Both bounds must be between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

`upperBound` must be greater than `lowerBound`.

## Examples

```javascript
const { randomInt } = require( "@geronimus/randomint" );

const randomByteValue = randomInt( 0, 255 );
```

## Parameters

`lowerBound` *number*

The smallest possible random value that can be produced.

`upperBound` *number*

The largest possible random value that can be produced.

## Notes

This function uses `Math.random()` as a pseudo-random number generator.

Therefore, ***DO NOT*** use it for any purpose that must be cryptographically secure.

