# resolveTypeName

Identifies the type of a value, whether the type is primitive, complex, or extended.

- If the value is a primitive type (eg, `boolean`, `number`, `string` ), then it returns the name of that type.

- If the value is `null`, then it returns the text `null`.

- If the value is a function, then it returns the text `function`.

- If the value is an ad-hoc object - such as an object defined inline - then it returns the text `object`.

- If the value is an object defined with a constructor function (eg, `new Date()`), then it returns the name of the constructor (eg, `Date`).

#### Example

```javascript
const { resolveTypeName } = require( "@geronimus/resolve-type-name" );

function resolveTypeName( undefined ); \\ => "undefined"
function resolveTypeName( true ); \\ => "boolean"
function resolveTypeName( 1 ); \\ => "number"
function resolveTypeName( "" ); \\ => "string"
function resolveTypeName( null ); \\ => "null"
function resolveTypeName( () => {} ); \\ => "function"
function resolveTypeName( {} ); \\ => "object"
function resolveTypeName( new Date() ); \\ => "Date"
```

