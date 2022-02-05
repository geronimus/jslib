# resolveTypeName

Identifies the type of a value, whether the type is primitive, complex, or extended.

- If the value is a primitive type (eg, `boolean`, `number`, `string` ), then it returns the name of that type.

- If the value is `null`, then it returns the text `null`.

- If the value is a function, then it returns the text `function`.

- If the value was defined as an object literal, then it returns the text `object`.

- If the value is an object defined with a constructor function (eg, `new Date()`), then it returns the name of the constructor (eg, `Date`).

## However, BEWARE!!!

This function is intended primarily for the development phase to construct meaningful error and log messages.

It is not really intended for use in program logic, and certainly never to produce any user-facing content.

The reason is that the value returned for objects created be a constructor function is based on `Object.prototype.constructor.name`. If your code gets minified, then the original text of the constructor function's name will be replaced by a shortened, unrecognizable, and potentially randomized name.

That means that this function will likely be unhelpful for production logging, and should not be used to produce error messages that may become visiable to the end user.

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

