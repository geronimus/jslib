# `@geronimus/jslib`

A modular set of utility functions for JavaScript.

Because there are some interdependencies, we we will build each function, and published to a package-manager, independently.

Thereafter, users will be free to import only the functions they need, without worrying about transitive dependencies.


---

# isEmpty( value : any ) : boolean

Identifies whether or not the provided value represents an empty value, such as an empty string or array.

## Syntax

```javascript
isEmpty( null ) // => true
isEmpty( undefined ) // => true
isEmpty( {} ) // => false
isEmpty( [] ) // => false
isEmpty( 0 ) // => false
isEmpty( false ) // => false
```

## Parameters

`value` *any*

The value to test for emptiness.



---

# isNull( value : any ) : boolean

Tests a value for strict equality with `null` and `undefined`, and returns `true` if the value is equal with either.

## Syntax

```javascript
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

