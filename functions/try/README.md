# Try

Contains functions to create `Success` and `Failure` objects, which you can return from function calls that may result in failure.

Rather than throwing an error and - if the error is not handled - interrupting the flow of control, you can "wrap" the error instance in a `Failure` object, where you can handle it using the ordinary control flow.

From successful executions, you can return a `Success` object, which can "wrap" a return value.

Both objects share this common interface:

## Properties

`isFailure` *boolean*

`true` if this is a `Failure` object. `false` if it is a `Success` object.

`isSuccess` *boolean*

`true` if this is a `Success` object. `false` if it is a `Failure` object.

## Failure( error )

Creates an instance of a `Failure` object.

It contains the `Try` interface described above, and an additional property - `error` - which is intended to reference an instance of a system-defined or user-defined error.

You can use the keyword `new` to create a new `Failure` instance, but you do not have to.

## Success( result )

Creates an instance of a `Success` object.

It contains the `Try` interface described above, and an optional additional property - `result`. You can use it to reference a return value.

You can use the keyword `new` to create a new `Success` instance, but you do not have to.

## Examples

```javascript
const { Failure, Success } = require( "@geronimus/try" );

function defineReadOnly( obj, propertyName, propertyValue ) {

  if ( typeof obj !== "object" || obj === null )
    return Failure( new TypeError( "obj must be a non-null object." ) );
  else
    return Success(
      Object.defineProperty(
        obj,
        propertyName,
        { enumerable: true, writable: false, value: propertyValue }
      )
    );
}
```

## Notes

- The value returned by `Success` will be an instance of `Success`. (`successValue instanceof Success; // => true`)
- The value returned by `Failure` will be an instance of `Failure`. (`failureValue instanceof Failure; // => true`)

