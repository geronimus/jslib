const { assert } = require( "chai" );
const randomInt = require( "../src/random-int" );

describe( "randomInt", () => {

  it( "Both arguments must be numbers.", () => {
    assert.throws( () => { randomInt(); }, ReferenceError );  
    assert.throws( () => { randomInt( 0 ); }, ReferenceError );  
    assert.throws( () => { randomInt( null, null ); }, TypeError );  
    assert.throws( () => { randomInt( undefined, undefined ); }, TypeError );  
    assert.throws( () => { randomInt( 0, true ); }, TypeError );  
    assert.throws( () => { randomInt( false, 1 ); }, TypeError );  
    assert.throws( () => { randomInt( 0, "1" ); }, TypeError );  
    assert.throws( () => { randomInt( "0", 1 ); }, TypeError );  
    assert.throws( () => { randomInt( [ 0 ], 1 ); }, TypeError );  
    assert.throws( () => { randomInt( 0, [ 1 ] ); }, TypeError );  
  });

  it( "upperBound must be greater than the lowerBound.", () => {
    assert.throws( () => { randomInt( 1, 1 ); }, RangeError );
    assert.throws( () => { randomInt( 1, 0 ); }, RangeError );
    assert.doesNotThrow( () => { randomInt( 0, 1 ); }, RangeError );
  });

  it( "Both arguments must be \"safe\" integers.", () => {
    assert.throws(
      () => { randomInt( 0, 9007199254740992 ); },
      RangeError
    );
    assert.throws(
      () => { randomInt( -9007199254740992, 0 ); },
      RangeError
    );
  });

  it( "Its boundaries are inclusive.", () => {
    // Produce 10 calls to randomInt with lowerBound 0 and upperBound 1.
    // If the result does not include at least one example of each value, then
    // one of the bounds is likely exclusive. (Short of an improbable
    // distribution.)
    const calls = [ ...( new Array( 10 ) ).keys() ]
      .map( call => randomInt( 0, 1 ) );

    [ 0, 1 ].forEach( value =>  {
      assert.include( calls, value );  
    });
  });

  it( "Its distribution is acceptable.", () => {
    // We'll call the distribution acceptable if, over a span of 100 random
    // integers between 0 and 99, there are at least 40 values on either side
    // of 50.
    const results = { "< 50": 0, ">= 50": 0 };
    
    for ( let call = 0; call < 100; call++ ) {
      const result = randomInt( 0, 99 );

      if ( result < 50 )
        results[ "< 50" ] = results[ "< 50" ] + 1;
      else
        results[ ">= 50" ] = results[ ">= 50" ] + 1;
    }

    assert.isAtLeast( results[ "< 50" ], 40 );
    assert.isAtLeast( results[ ">= 50" ], 40 );
  });

  it( "Its distribution holds for negative numbers.", () => {  
    const results = { "<= -50": 0, "> -50": 0 };
    
    for ( let call = 0; call < 100; call++ ) {
      const result = randomInt( -99, 0 );

      if ( result <= -50 )
        results[ "<= -50" ] = results[ "<= -50" ] + 1;
      else
        results[ "> -50" ] = results[ "> -50" ] + 1;
    }

    assert.isAtLeast( results[ "<= -50" ], 40 );
    assert.isAtLeast( results[ "> -50" ], 40 );
  });
});

