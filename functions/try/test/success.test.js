const { assert } = require( "chai" );
const { Success } = require( "../src/try" );

describe( "Success", () => {

  it( "Identifies itself as a Success.", () => {
    
    assert.isTrue( Success().isSuccess );
  });

  it( "Identifies itself as not a Failiure.", () => {
    
    assert.isFalse( Success().isFailure );
  });

  it( "Is an instance of a Success.", () => {
    
    assert.instanceOf( Success(), Success );
  });

  it( "No two Successes are the same.", () => {

    assert.notStrictEqual( Success(), Success() );
  });

  it( "Exposes the object you pass to it as `result`.", () => {

    const returnValue = 0;
    const success = Success( returnValue );

    assert.strictEqual( success.result, returnValue );
  });
});

