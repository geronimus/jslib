const { assert } = require( "chai" );
const { Failure, Success, Try } = require( "../src/try" );

describe( "Try( operation )", () => {

  it(
    "If you don't pass it an operation, it actually throws a TypeError.",
    () => {
      [ null, undefined, true, 1, "function", {} ].forEach( badInit => {
        assert.throws( () => { return Try( badInit ); }, TypeError );
      });
    }
  );

  it(
    "If your operation throws, it returns a failure containing the exception.",
    () => {
      const typeErr = Try( () => { throw new TypeError( "TypeError" ); } );
      const refErr = Try(
        () => { throw new ReferenceError( "ReferenceError" ); }
      );

      assert.instanceOf( typeErr, Failure );
      assert.instanceOf( typeErr.error, TypeError );
      assert.strictEqual( typeErr.error.message, "TypeError" );

      assert.instanceOf( refErr, Failure );
      assert.instanceOf( refErr.error, ReferenceError );
      assert.strictEqual( refErr.error.message, "ReferenceError" );
    }
  );

  it(
    "If your operation returns nothing, you get a success wrapping " +
      "`undefined`.",
    () => {
      const emptyFunc = Try( () => {} );

      assert.instanceOf( emptyFunc, Success );
      assert.strictEqual( emptyFunc.result, undefined );
    }
  );

  it(
    "If your function returns something, then you get a Success wrapping the " +
      "return value.",
    () => {
      const thing = { "thing": true };
      function returnThatThing() { return thing; }

      const returned = Try( returnThatThing );

      assert.instanceOf( returned, Success );
      assert.strictEqual( returned.result, thing );
    }
  );
});

