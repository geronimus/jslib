const { assert } = require( "chai" );
const TypeErr = require( "../src/type-err" );

describe( "TypeErr( param, expectedType, actualType )", () => {

  it( "Produces a TypeError instance with a predictable message.", () => {
  
    const param = "text";
    const requiredType = "string";
    const foundType = "number";

    const result = TypeErr( param, requiredType, foundType );

    assert.instanceOf( result, TypeError );
    assert.strictEqual(
      result.message,
      `Parameter: ${ param }` +
        `\n  Expected: ${ requiredType }\n  Found: ${ foundType }`
    );
  });
});

