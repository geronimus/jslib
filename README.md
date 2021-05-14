# `@geronimus/jslib`

A modular set of utility functions for JavaScript.

Nothing here is rocket science. The intent is to provide some basic functionality that it would be handy not to have to re-implement in every project.

Each function is intended to be published to the package manager independently, so that a user will only have to depend on the functions they end up using.

## Contents

- [coalesce](#coalesce--value1--value2------)
- [defineReadOnly](#defineReadOnly-obj-propertyMap-)
- [isEmpty](#isEmpty-value-)
- [isNull](#isNull-value-)
- [isObject](#isObject-value-)
- [randomInt](#randomInt-lowerBound-upperBound-)
- [range](#range-lowerBound-upperBound-)
- [TypeErr](#TypeErr-param-expectedType-actualType-)
- [uuid](#uuid)



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

# defineReadOnly( obj, propertyMap )

Defines each key-value pair from the property map that you provide as an enumerable property on the target object - but one that cannot be changed or deleted.

## Examples

```javascript
const { defineReadOnly } = require( "@geronimus/define-read-only" );

const permanentRecord = {};

defineReadOnly(
  permanentRecord,
  {
    taxYear1929FilingDate: "1930-02-28",
    taxYear1930FilingDate: "1931-05-30"
  }
);

// Each property remains enumerable:
Object.keys( permanentRecord ); // => [ "taxYear1929FilingDate", "taxYear1930FilingDate" ]

// You cannot update them:
permanentRecord.taxYear1930FilingDate = "1931-03-31";
permanentRecord.taxYear1930FilingDate; // => "1931-05-30"

// You cannot delete them:
delete permanentRecord.taxYear1930FilingDate; // => false
permanentRecord.taxYear1930FilingDate; // => "1931-05-30"
```

## Parameters

`obj` *object*

The object to which the read-only, enumerable properties will be added. It must not be frozen.

`propertyMap` *object*

A map containing one or more key-value pairs to add to the target object as enumerable-but-not-writable properties.

## Notes

- Values from the `propertyMap` that are not primitive values (eg, objects ) will be added by reference. They will not be deep copies.
- Each property added will be enumerable, but not writable or configurable.
- This function does not allow you to define property getters or setters.
- The motivation for this function is to be able to easily add immutable - yet enumerable -  properties to the returned `this` object, when a function is called with the `new` operator. (Properties added with `Object.defineProperty` or `Object.defineProperties` are not enumerable, unless you explicitly specify otherwise.)



---

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



---

# isNull( value )

Tests a value for strict equality with `null` and `undefined`, and returns `true` if the value is equal with either.

## Examples

```javascript
const { isNull } = require( "@geronimus/is-null" );

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

# isObject( value )

Returns `true` if - and only if - the referenced value's type is `"object"`, and it is not the value `null`.

Be aware that Arrays will return `true` because their type resolves to `"object"`.

## Examples

```javascript
const { isObject } = require( "@geronimus/is-object" );

isObject( undefined ); // => false
isObject( null ); // => false
isObject( 1 ); // => false
isObject( true ); // => false
isObject( "object" ); // => false
isObject( {} ); // => true
isObject( [] ); // => true
isObject( new Date() ); // => true
```

## Parameters

`value` *any*

The value that you want to identify as an `"object"`.

## Notes

- An Array will return `true` because it behaves as an object.
- Although `typeof null` resolves to `"object"`, `null` returns `false` because it does not behave like an object. (eg, It does not have, and cannot have, any properties.)



---

# randomInt( lowerBound, upperBound )

Generates a pseudo-random integer value between the bounds that you specify. (Both inclusive.)

If either number has a decimal part, it will be truncated.

Both bounds must be between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

`upperBound` must be greater than `lowerBound`.

## Examples

```javascript
const { randomInt } = require( "@geronimus/random-int" );

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



---

# range( lowerBound, upperBound )

Generates an array containing all of the integers between the two bounds that you specify. (Inclusive.)

## Examples

```javascript
const { range } = require( "@geronimus/range" );

console.log( range( 1, 5 ) );
// Expected output:
// => [ 1, 2, 3, 4, 5 ]
```

## Parameters

`lowerBound` *number*

The first number in the integer sequence that will be produced.

`upperBound` *number*

The last number in the integer sequence that will be produced.

## Notes

If either argument has a decimal part, it will be truncated.

Both bounds must be between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

`upperBound` must be greater than or equal to `lowerBound`.

The difference between the two bounds must be less than 4,294,967,296 (2<sup>32</sup>).



---

# TypeErr( param, expectedType, actualType )

Returns a new instance of a `TypeError` with the error message:

    Parameter: _param_
      Expected: _expectedType_
      Actual: _actualType_

## Examples

```javascript
const { TypeErr } = require( "@geronimus/type-err" );

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



---

# uuid()

Generates a Universally Unique Identifier, based on variant 4 (random) of the [Internet Engineering Task Force (IETF) Request for Comments (RFC) 4122](https://tools.ietf.org/html/rfc4122) proposal.

Specifically, this function generates its canonical string representation.

## Examples

```javascript
const { uuid } = require( "@geronimus/uuid" );

console.log( uuid() );
// Expected output:
// => "8afe0169-17a2-4091-8375-30ca1d4333ab" (Or similar.)

const id1 = uuid();
const id2 = uuid();

if ( id1 === id2 )
  console.log( "It's an impossible coincidence!" );
else
  console.log( "Each value is unique." );
```

## Notes

The randomness of this function depends on `Math.random()`. Therefore, it ***MUST NOT*** be used for any purpose requiring cryptographic security.

