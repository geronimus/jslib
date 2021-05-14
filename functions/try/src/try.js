const { defineReadOnly } = require( "@geronimus/define-read-only" );

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

module.exports = { Failure, Success };

