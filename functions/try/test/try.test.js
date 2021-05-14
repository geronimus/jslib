const { assert } = require( "chai" );
const { Failure, Success } = require( "../src/try" );

describe( "Failure", () => {

  it( "Identifies itself as a Failure.", () => {
    
    assert.isTrue( Failure().isFailure );
  });

  it( "Identifies itself as not a Success.", () => {
    
    assert.isFalse( Failure().isSuccess );
  });

  it( "Is an instance of a Failure.", () => {
    
    assert.instanceOf( Failure(), Failure );
  });

  it( "No two Failures are the same.", () => {

    assert.notStrictEqual( Failure(), Failure() );
  });

  it( "Exposes the object you pass to it as `error`.", () => {

    const typeError = new TypeError( "The argument was the wrong type." );
    const failure = Failure( typeError );
    
    assert.strictEqual( failure.error, typeError );
  });
});

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

