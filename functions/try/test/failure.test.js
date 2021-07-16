const { assert } = require( "chai" );
const { Failure } = require( "../src/try" );

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

