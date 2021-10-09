const { assert } = require( "chai" );
const TypeErr = require( "../src/type-err" );

describe( "TypeErr( refName, expectedTypeName, foundInstance )", () => {

  it(
    "Produces a TypeError instance with a predictable message for primitive " +
      "types.",
    () => {
    
      const param = "text";
      const requiredType = "string";
      const foundInstance = 0;

      const result = TypeErr( param, requiredType, foundInstance );

      assert.instanceOf( result, TypeError );
      assert.strictEqual(
        result.message,
        `Reference name: ${ param }` +
          `\n  Expected: ${ requiredType }\n  Found: ${ typeof 0 }`
      );
    }
  );

  it(
    "Produces a TypeError instance with a predictable message for complex " +
      "types.",
    () => {
    
      const param = "text";
      const requiredType = "string";
      const foundInstance = new Date();

      const result = TypeErr( param, requiredType, foundInstance );

      assert.instanceOf( result, TypeError );
      assert.strictEqual(
        result.message,
        `Reference name: ${ param }` +
          `\n  Expected: ${ requiredType }\n  ` +
          `Found: ${ foundInstance.constructor.name }`
      );
    }
  );
});

