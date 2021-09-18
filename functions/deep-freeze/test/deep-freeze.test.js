const { assert } = require( "chai" );
const deepFreeze = require( "../src/deep-freeze" );

describe( "deepFreeze( obj )", () => {

  it( "Any non-objects are simply returned unaltered.", () => {
  
    [ undefined, null, true, 1, "Hello!" ].forEach( nonObject => {
      
      assert.strictEqual( deepFreeze( nonObject ), nonObject );
    });
  });

  it( "Freezes all levels of nested objects.", () => {
    
    const nestedObject = {
      level: 0,
      next: {
        level: -1,
        next: {
          level: -2
        }
      }
    };

    // The object in question does not start off frozen.
    assert.isFalse( Object.isFrozen( nestedObject ) );

    const result = deepFreeze( nestedObject );

    // The object is frozen in place. It is not deeply copied.
    assert.strictEqual( result, nestedObject );

    // All levels of the object get frozen.
    result.level = 1;
    assert.strictEqual( result.level, 0 );
    assert.isTrue( Object.isFrozen( result ) );

    result.next.level = 1;
    assert.strictEqual( result.next.level, -1 );
    assert.isTrue( Object.isFrozen( result.next ) );

    result.next.next.level = 1;
    assert.strictEqual( result.next.next.level, -2 );
    assert.isTrue( Object.isFrozen( result.next.next ) );
  });
});

module.exports = { deepFreeze };

