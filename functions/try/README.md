# try

Contains functions to create `Success` and `Failure` objects, which you can return from function calls that may result in failure.

Rather than throwing an error and - if the error is not handled - interrupting the flow of control, you can "wrap" the error instance in a `Failure` object, where you can handle it using the ordinary control flow.

From successful executions, you can return a `Success` object, which can "wrap" a return value.

Both objects share this common interface:

## Properties

**isFailure** *boolean*

`true` if this is a `Failure` object. `false` if it is a `Success` object.

**isSuccess** *boolean*

`true` if this is a `Success` object. `false` if it is a `Failure` object.

## Constructor Functions

### Failure( error )

Creates an instance of a `Failure` object.

It contains the `Try` interface described above, and an additional property - `error` - which is intended to reference an instance of a system-defined or user-defined error.

You can use the keyword `new` to create a new `Failure` instance, but you do not have to.

### Success( result )

Creates an instance of a `Success` object.

It contains the `Try` interface described above, and an optional additional property - `result`. You can use it to reference a return value.

You can use the keyword `new` to create a new `Success` instance, but you do not have to.

#### Example

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

### Try( operation )

This is a constructor for either a `Success` or `Failure` object.

You provide an `operation` (a function), and `Try` will execute that function.

If your operation completes successfully, `Try` will return a `Success`.

If it returns a value, then the `Success` object will contain that value as its `result`.

If your operation produces an error, then `Try` will return a `Failure` that wraps that error.

#### Example

```javascript
const { Try } = require( "@geronimus/try" );

const opResult = Try( () => { return opThatCouldFail( true ); } );

if ( opResult.isSuccess ) {
  renderResult( opResult.result );
} else {
  renderErrorMessage( opResult.error.message );
}
```

### TryAll( ops )

This is a constructor for either a `Success` or `Failure` object.

You provide an array of operations (which must be functions).

Each will be called in sequence.

If any of them results in an error, then the first error will be returned, wrapped in a `Failure`.

If any function returns a `Failure` rather than throwing an error, `TryAll` immediately returns that `Failure`, rather than allowing the execution of functions to continue, or returning that `Failure` wrapped in a `Success`.

If all operations complete successfully, then `TryAll` will return a `Success` wrapping the final returned result.

If any intermediary operations return a result, then `TryAll` will pass each result as the first argument to the next function in the chain.

#### Examples

##### Success

```javascript
const { TryAll } = require( "@geronimus/try" );

function one() { return "One potato, "; }
function two( prev ) { return prev + "two potato, "; }
function three( prev ) { return prev + "three potato, "; }
function four( prev ) { return prev + "four!"; }

TryAll( [ one, two, three, four ] );
// => Success( "One potato, two potato, three potato, four!" )
```

##### Failure

```javascript
const { TryAll } = require( "@geronimus/try" );

function one() { return "One potato, "; }
function two( prev ) { return prev + "two potato, "; }
function three( prev ) { throw new Error( "Hands off my potatoes!" ); }
function four( prev ) { return prev + "four!"; }

TryAll( [ one, two, three, four ] );
// => Failure( "Hands off my potatoes!" )
```

## Notes

- The value returned by `Success` will be an instance of `Success`. (`successValue instanceof Success; // => true`)
- The value returned by `Failure` will be an instance of `Failure`. (`failureValue instanceof Failure; // => true`)

