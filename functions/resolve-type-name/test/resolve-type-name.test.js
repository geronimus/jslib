const { assert } = require( "chai" );
const resolveTypeName = require( "../src/resolve-type-name" );

describe( "resolveTypeName( value )", () => {

  it( "Correctly identifies null.", () => {
    
    assert.strictEqual( resolveTypeName( null ), "null" );
  });

  it( "Correctly identifies primitive types.", () => {

    [
      [ undefined, typeof undefined ],
      [ true, typeof true ],
      [ 1, typeof 1 ],
      [ "", typeof "" ]
    ].forEach( typeTuple => {
      assert.strictEqual( resolveTypeName( typeTuple[ 0 ] ), typeTuple[ 1 ] );
    });
  });

  it( "Correctly identifies ad-hoc objects.", () => {

    assert.strictEqual( resolveTypeName( {} ), "object" );
  });

  it( "Correctly identifies arrays.", () => {

    assert.strictEqual( resolveTypeName( [] ), "array" );
  });

  it( "Correctly identifies extended object types.", () => {

    [
      [ new Date(), ( new Date() ).constructor.name ],
      [ new CustomType(), "CustomType" ]
    ].forEach( typeTuple => {
      assert.strictEqual( resolveTypeName( typeTuple[ 0 ] ), typeTuple[ 1 ] );
    });
  });

  it( "Correctly identifies function types.", () => {
    
    assert.strictEqual( resolveTypeName( () => {} ), "function" );
  });
});

function CustomType() { this.createdDate = new Date(); }

