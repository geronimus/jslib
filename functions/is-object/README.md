# isObject( value )

Returns `true` if - and only if - the referenced value's type is `"object"`, and it is not the value `null`.

Be aware that Arrays will return `true` because their type resolves to `"object"`.

## Examples

```javascript
const isObject = require( "@geronimus/is-object" );

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

