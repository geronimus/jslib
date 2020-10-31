const { assert } = require( "chai" );
const { uuid } = require( "../src/uuid" );

describe( "uuid", () => {

  const resultSet = new Set();
  
  for ( let item = 0; item < 100; item++ ) {
    resultSet.add( uuid() );  
  }

  it( "Adheres to the canonical string format.", () => {
    resultSet.forEach(
      example => {
        assert.match(
          example,
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        );
      }
    );
  });

  it( "Produces unique values", () => {
    assert.strictEqual( resultSet.size, 100 );
  });
});

