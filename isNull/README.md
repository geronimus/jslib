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

## Usage Notes

This function is part of a modular library. But the pieces are separated in order to be able to depend on only the components you need.

For that reason, this function is exported as the only member of its object.

You can import it like this:

```javascript
const { isNull } = require( "@geronimus/isNull"; )
```

