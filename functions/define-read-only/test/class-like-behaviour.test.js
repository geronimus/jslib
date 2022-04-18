const { assert } = require( "chai" );
const defineReadOnly = require( "../src/define-read-only" );

// A class-like object definer:
function NumberHolder() {

  if ( typeof new.target !== "function" )
    return new NumberHolder();

  // Private members:
  let myNumber = 0;

  // Public interface:
  defineReadOnly(
    this,
    {
      increment,
      get number() { return myNumber; },
      set number( value ) {
        if ( typeof value === "number" && !Number.isNaN( value ) )
          myNumber = value;
      }
    }
  );

  // Public methods:
  function increment() {
    myNumber += 1;
  }
}

describe( "You can use it to simulate a class-like object interface.", () => {

  it( "Class-like objects are instances of their constructor.", () => {
  
    const ex = new NumberHolder();
    // Clumsy initialization:
    const oops = NumberHolder();

    assert.instanceOf( ex, NumberHolder );
    assert.instanceOf( oops, NumberHolder );
  });

  it( "Class-like object properties remain read-only.", () => {

    const ex = new NumberHolder();

    assert.deepEqual(
      Object.keys( ex ),
      [ "increment", "number" ],
      "All added properties are enumerable."
    );

    Object.keys( ex )
      .forEach( prop => {
        delete ex[ prop ];
        assert.isDefined(
          ex[ prop ],
          "You still can't delete added properties."
        );

        ex[ prop ] = null;
        assert.exists(
          ex[ prop ],
          "You still can't reassign added properties."
        );
      });
  });

  it( "Getters and setters remain \"live\".", () => {

    const ex = new NumberHolder();

    assert.strictEqual( ex.number, 0 );

    ex.increment();
    ex.increment();

    assert.strictEqual(
      ex.number,
      2,
      "Getters reflect the actions of external mutators."
    );

    ex.number = 100;
    
    assert.strictEqual(
      ex.number,
      100,
      "Getters reflect the actions of setters."
    );

    ex.number = Number.NaN;

    assert.strictEqual(
      ex.number,
      100,
      "Setters apply the logic with which they were defined."
    );
  });
});

