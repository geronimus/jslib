# Option

Contains functions to create `Some` and `None` objects, which you can return from function calls that may or may not return a result.

The idea is to avoid returning `null` or `undefined` - whether intentionally, accidentally, or by default - and to make explicit the idea that giving no result is a legitimate possibility, which  any code that calls the function must be prepared to deal with.

When the invocation should return a result, you can "wrap" it in a `Some`.

When there is no result, you return the `None` singleton object.

Both objects share this common interface:

## Properties

`isEmpty` *boolean*

`true` if this is the `None` object, or a `Some` object that holds the value `undefined` or `null`. `false` if it is a `Some` object that holds a value.

## Methods

`map( transformation )` *function*

If called on the `None` object, this method always returns `None`, no matter what function you pass to it.

If called on a `Some` object, this method returns another `Some` object containing the result of applying the `transformation` function to the original `Some`'s `value`.

### None

`None` is not a function. It is a singleton object that you may return instead of a call to `Some`. (`Some` is a function.)

The `None` object adheres to to the **Option** interface described above.

As a simple object, `None` is not an `instanceof` anything. You cannot use the `new` keyword with `None`, nor does it have any meaning to call `None` with parentheses.

There is only one `None` object. As such, `None === None` returns `true`.

### Some( value )

Creates an instance of a `Some` object.

The returned object adheres to to the **Option** interface described above and contains the additional property `value`, which references the value that the `Some` object  holds.

You can use the keyword `new` to create a new `Some` instance, but you do not have to.

#### Parameters

`value` *any*

The value that you want to wrap in a `Some` object.

## Examples

```javascript
const { None, Some } = require( "@geronimus/option" );

function getFirstItem( array ) {

  if ( !Array.isArray( array ) || array.length === 0 )
    return None;
  else
    return Some( array[ 0 ] );
}
```

## Notes

- If you forget to provide an argument to `Some`, it will contain the value `undefined`, which seems like a contradiction. In this case, its `isEmpty` value will be `true`. We leave this possibility open ( - rather than, say, returning `None` when a value is not provided - ) in order not to be too opinionated about its usage.
- These objects provide a (much) simplified implementation of a pattern popularized by the Scala programming language.

