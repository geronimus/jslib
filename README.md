# `@geronimus/jslib`

A modular set of utility functions for JavaScript.

Because there are some interdependencies, we we will build each function, and published to a package-manager, independently.

Thereafter, users will be free to import only the functions they need, without worrying about transitive dependencies.


---

# isNull( value : any ) : boolean

Tests a value for strict equality with `null` and `undefined`, and returns `true` if the value is equal with either.

## Syntax

```ecmascript
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

## Usage Notes

This function is part of a modular library. But the pieces are separated in order to be able to depend on only the components you need.

For that reason, this function is exported as the only member of its object.

You can import it like this:

```ecmascript
const { isNull } = require( "@geronimus/isNull"; )
```

