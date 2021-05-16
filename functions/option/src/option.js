const { defineReadOnly } = require( "@geronimus/define-read-only" );
const { TypeErr } = require( "@geronimus/type-err" );

const None = Object.freeze({
  isEmpty: true,
  map: function map() { return None; }
});

function Some( value ) {

  if ( typeof new.target !== "function" )
    return new Some( value );

  function map( transformation ) {
  
    if ( typeof transformation !== "function" )
      throw TypeErr( "transformation", "function", typeof transformation );
    else
      return Some( transformation.call( null, value ) );
  }

  defineReadOnly(
    this,
    {
      isEmpty: ( value === undefined || value === null ),
      map,
      value
    }
  );
}

module.exports = { None, Some };

