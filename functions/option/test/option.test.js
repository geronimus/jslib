const { assert } = require( "chai" );
const { None, Some } = require( "../src/option" );

describe( "None", () => {

  it( "Is always empty.", () => {

    assert.isTrue( None.isEmpty );
  });

  describe( ".map( trasformation )", () => {

    it( "Always returns `None`, no matter what function you give it.", () => {
      
      const plusOne = function ( arg ) { return arg + 1; };
      const alwaysOne = function ( arg ) { return 1; };

      assert.strictEqual( None.map( plusOne ), None );
      assert.strictEqual( None.map( alwaysOne ), None );
    });
  });
});

describe( "Some( value )", () => {

  it( "Returned objects are instances of Some.", () => {

    assert.instanceOf( Some( 1 ), Some );
  });

  it( "When called without a value, the object it returns is empty.", () => {

    const forgottenSome = Some();

    assert.instanceOf( forgottenSome, Some )
    assert.isTrue( forgottenSome.isEmpty );
  });

  it(
    "When called explicitly with `null` or `undefined`, it is still empty.",
    () => {

      // What is this senslessness?
      const undefinedSome = Some( undefined );
      const nullSome = Some( null );

      assert.instanceOf( undefinedSome, Some );
      assert.isTrue( undefinedSome.isEmpty );

      assert.instanceOf( nullSome, Some );
      assert.isTrue( nullSome.isEmpty );
    }
  );

  it(
    "Otherwise, `Some` returns a non-empty object containing the value that " +
      "you passed to it.",
    () => {

      const result = { status: "succeeded", opCode: 0 };
      const valuedSome = Some( result );

      assert.instanceOf( valuedSome, Some );
      assert.isFalse( valuedSome.isEmpty );
      assert.strictEqual( valuedSome.value, result );
    }
  );
  
  describe( ".map( transformation )", () => {

    it( "If you do not pass it a function, it throws a TypeError", () => {

      [ undefined, null, true, 1, {}, [], new Date() ].forEach( badFunction => {
        assert.throws(
          () => { const val = Some( 1 ).map( badFunction ); },
          TypeError
        );
      });
    });

    it(
      "Returns a new `Some` containing the result of applying the " +
        "transformation function to the `Some`'s `value`.",
      () => {

        const originalValue = 1;
        const transformationFunction = function transformation( value ) {
          return value + 1;
        }
        const originalSome = Some( originalValue );
        const transformedSome = originalSome.map( transformationFunction );
        
        assert.strictEqual(
          transformedSome.value,
          transformationFunction.call( null, originalValue )
        );
      }
    );
  });
});

