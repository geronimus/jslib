const { assert } = require( "chai" );
const coalesce = require( "../src/coalesce" );

describe( "coalesce", () => {

  it( "Given no arguments, it returns undefined.", () => {
    assert.isUndefined( coalesce() );
  });

  it(
    "Given only a null or undefined argument, it gives you that argument back.",
    () => {
      assert.isUndefined( coalesce( undefined ) );
      assert.isNull( coalesce( null ) );
    });

  it( "Returns the first non-null (or undefined) argument.", () => {
    assert.strictEqual( coalesce( false ), false );
    assert.strictEqual( coalesce( 0, null, 1 ), 0 );
    assert.strictEqual( coalesce( null, 0, 1 ), 0 );

    const emptyObj = {};
    assert.strictEqual(
      coalesce( null, null, undefined, emptyObj, null ),
      emptyObj
    );
  });
});

