const { assert } = require( "chai" );
const defineReadOnly = require( "../src/define-read-only" );

describe( "defineReadOnly( obj, propertyMap )", () => {

  const props = Object.freeze({
    taxYear1929FilingDate: "1930-02-28",
    taxYear1930FilingDate: "1931-05-30"
  });
  const record = defineReadOnly( {}, props );

  it( "Rejects non-object values for obj and propertyMap", () => {

    [ undefined, null, true, 1, "obj" ].forEach( badObj => {

      assert.throws(
        () => { defineReadOnly( badObj, { prop: true } ) },
        TypeError
      );
      assert.throws(
        () => { defineReadOnly( {}, badObj ) },
        TypeError
      );
    });
  });

  it( "Rejects frozen target objects.", () => {

    assert.throws(
      () => { defineReadOnly( Object.freeze({}), { prop: 1 } ) },
      TypeError
    );
  });

  it( "Adds properties that are enumerable.", () => {
    
    assert.deepEqual( Object.keys( record ), Object.keys( props ) );
  });

  it( "Adds properties that cannot be overwritten.", () => {
    
    record.taxYear1930FilingDate = "1931-03-31";

    assert.strictEqual(
      record.taxYear1930FilingDate,
      props.taxYear1930FilingDate
    );
  });

  it( "Adds properties that cannot be deleted.", () => {
  
    delete record.taxYear1930FilingDate;
    
    assert.property( record, "taxYear1930FilingDate" );
  });

  it( "Adds properties whose descriptors cannot be altered.", () => {
    
    Object.getOwnPropertyDescriptor( record, "taxYear1930FilingDate" )
      .writable = true;

    assert.isFalse(
      Object.getOwnPropertyDescriptor(
        record,
        "taxYear1930FilingDate"
      ).writable
    );
  });
});

