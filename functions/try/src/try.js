const { defineReadOnly } = require( "@geronimus/define-read-only" );
const { TypeErr } = require( "@geronimus/type-err" );

function Failure( error ) {

  if ( new.target === undefined )
    return new Failure( error );

  defineReadOnly(
    this,
    {
      error,
      isFailure: true,
      isSuccess: false
    }
  );
}

function Success( result ) {
  
  if ( new.target === undefined )
    return new Success( result );

  defineReadOnly(
    this,
    {
      isFailure: false,
      isSuccess: true,
      result
    }
  );
}

function Try( operation ) {

  if ( typeof operation !== "function" )
    throw TypeErr( "operation", "function", typeof operation );
  else
    try { return Success( operation() ); }
    catch ( error ) { return Failure( error ); }
}

module.exports = { Failure, Success, Try };

