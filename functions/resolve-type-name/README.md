# resolveTypeName

Gives the name of the type of a value, whether that type is a primitive, an object literal, or an object returned by a constructor function.

- If the value is a primitive type (eg, `boolean`, `number`, `string` ), then it returns the name of that type.

- If the value is `null`, then it returns the text `null`.

- If the value is a function, then it returns the text `function`.

- If the value was defined as an object literal, then it returns the text `object`.

- If the value is an object defined with a constructor function (eg, `new Date()`), then it returns the name of the constructor (eg, `"Date"`).

### However, BEWARE!!!

This function is intended primarily to construct meaningful error and log messages during the development phase of a project.

It is not intended for use in program logic, and certainly never to produce any user-facing content.

The reason is that - for objects created using a constructor function - the value returned is the value of `Object.prototype.constructor.name`. If your code gets minified, then the constructor function's original name will be replaced by a shortened, unrecognizable, and potentially randomized name.

This means that this function:

  - Should never be used to determine the type of a user-defined object in program logic. (Use the `instanceof` operator instead.)
  - Will likely be unhelpful for production logging, and should not be used to produce error messages that may become visible to the end user.

#### Example

```javascript
const resolveTypeName = require( "@geronimus/resolve-type-name" );

function resolveTypeName( undefined ); \\ => "undefined"
function resolveTypeName( true ); \\ => "boolean"
function resolveTypeName( 1 ); \\ => "number"
function resolveTypeName( "text" ); \\ => "string"
function resolveTypeName( null ); \\ => "null"
function resolveTypeName( () => {} ); \\ => "function"
function resolveTypeName( {} ); \\ => "object"
function resolveTypeName( new Date() ); \\ => "Date"
```

