const { assert } = require( "chai" );
const isEmpty = require( "../src/is-empty" );

describe( "isEmpty", () => {
  it( "Identifies empty expressions.", () => {
    [
      null,
      undefined,
      NaN,
      "",
      [],
      {},
      new Map(),
      new Set()
    ].forEach(
      val => { assert.isTrue( isEmpty( val ) ); }
    );
  });

  it( "Identifies non-empty expressions.", () => {
    const nonEmptyMap = new Map();
    nonEmptyMap.set( {}, {} );

    [
      false,
      0,
      0n,
      Infinity,
      " ",
      new Date(),
      [ {} ],
      { 0: 0 },
      new Map().set( {}, {} ),
      new Set().add( {} )
    ].forEach(
      val => { assert.isFalse( isEmpty( val ) ); }
    );
  });
});

