const { assert } = require( "chai" );
const { TryAll } = require( "../src/try" );

describe( "TryAll( ops )", () => {

  it( "If not passed an array, it throws a TypeError.", () => {

    [ null, undefined, true, 1, "op", { "op": () => {} } ].forEach( badInit => {
      
      assert.throws( () => { TryAll( badInit ); }, TypeError );
    });
  });

  it( "If passed an empty array, it returns an empty Success.", () => {

    const result = TryAll( [] );

    assert.isTrue( result.isSuccess );
    assert.isUndefined( result.result );
  });

  it( "If any elements are not functions, it throws a TypeError.", () => {

    assert.throws(
      () => { TryAll( [ null, () => {}, () => {} ] ) },
      TypeError
    );
    assert.throws(
      () => { TryAll( [ () => {}, undefined, () => {} ] ) },
      TypeError
    );
    assert.throws(
      () => { TryAll( [ () => {}, () => {}, true ] ) },
      TypeError
    );
  });

  it( "Returns the first error thrown by one of its functions.", () => {

    const res1 = TryAll(
      [
        () => { throw Error( "1" ); },
        () => { throw Error( "2" ); },
        () => { throw Error( "3" ); }
      ]
    );
    assert.isTrue( res1.isFailure );
    assert.strictEqual( res1.error.message, "1" );

    const res2 = TryAll(
      [ () => { return "1"; }, () => { throw Error( "2" ); }, () => { throw Error( "3" ); } ]
    );
    assert.isTrue( res2.isFailure );
    assert.strictEqual( res2.error.message, "2" );

    const res3 = TryAll(
      [ () => { return "1"; }, () => { return "2"; }, () => { throw Error( "3" ); } ]
    );
    assert.isTrue( res3.isFailure );
    assert.strictEqual( res3.error.message, "3" );

  });

  it(
    "If you parameterize the functions, you can pass successful results " +
      "down the chain.",
    () => {
      const chainResult = TryAll(
        [
          () => { return 1; },
          arg2 => { return arg2 + 1; },
          arg3 => { return arg3 + 1; }
        ]
      );

      assert.isTrue( chainResult.isSuccess );
      assert.strictEqual( chainResult.result, 3 );
    }
  );
});

