const { assert } = require( "chai" );
const range = require( "../src/range" );

describe( "range", () => {

  it( "Both arguments must be numbers.", () => {
    assert.throws( () => { range(); }, ReferenceError );  
    assert.throws( () => { range( 0 ); }, ReferenceError );  
    assert.throws( () => { range( null, null ); }, TypeError );  
    assert.throws( () => { range( undefined, undefined ); }, TypeError );  
    assert.throws( () => { range( 0, true ); }, TypeError );  
    assert.throws( () => { range( false, 1 ); }, TypeError );  
    assert.throws( () => { range( 0, "1" ); }, TypeError );  
    assert.throws( () => { range( "0", 1 ); }, TypeError );  
    assert.throws( () => { range( [ 0 ], 1 ); }, TypeError );  
    assert.throws( () => { range( 0, [ 1 ] ); }, TypeError );  
  });

  it( "upperBound must be greater than or equal to lowerBound.", () => {
    assert.throws( () => { range( 1, 0 ); }, RangeError );
    assert.doesNotThrow( () => { range( 1, 1 ); }, RangeError );
    assert.doesNotThrow( () => { range( 0, 1 ); }, RangeError );
  });

  it( "Both arguments must be \"safe\" integers.", () => {
    assert.throws(
      () => { range( 0, 9007199254740992 ); },
      RangeError
    );
    assert.throws(
      () => { range( -9007199254740992, 0 ); },
      RangeError
    );
  });

  it( "Rejects requests to create a range greater than 4294967295 values.",
    () => {
      assert.throws( () => { range( 0, 4294967295 ) }, RangeError );
      assert.throws( () => { range( -2147483648, 2147483647 ) }, RangeError );
    });

  it( "Can produce ranges with one element.", () => {
    assert.deepEqual( range( 1, 1 ), [ 1 ] );  
  });

  it( "Can produce ranges with multiple elements.", () => {
    assert.deepEqual( range( 1, 5 ), [ 1, 2, 3, 4, 5 ] );  
    assert.deepEqual( range( -3, 3 ), [ -3, -2, -1, 0, 1, 2, 3 ] );  
  });
});

