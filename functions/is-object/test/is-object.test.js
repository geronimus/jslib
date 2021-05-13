const { assert } = require( "chai" );
const { isObject } = require( "../src/is-object" );

describe( "isObject( value )", () => {

  it( "Tests false for objects whose `typeof` value is not \"object\".", () => {
    
    [ undefined, true, 1, 1.23, "object" ].forEach( value => {
    
      assert.isFalse( isObject( value ) );
    });
  });

  it( "Tests false for null.", () => {
    
    assert.isFalse( isObject( null ) );
  });

  it( "Tests true for objects and arrays.", () => {
  
    [ {}, [], new Date(), Object.freeze({ frozen: true }) ].forEach( obj => {
      
      assert.isTrue( isObject( obj ) );
    });
  });
});

