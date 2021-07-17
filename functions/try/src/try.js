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
      isSuccess: false,
      toString: () => { return `Failure( ${ error.message } )`; }
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
      result,
      toString: () => { return `Success( ${ result } )`; }
    }
  );
}

function Try( operation ) {

  if ( typeof operation !== "function" )
    throw TypeErr( "operation", "function", typeof operation );
  else
    try {
      const res = operation();

      // If the operation returns a Success or Failure, we "flat-map" it, so
      // that we don't return a Success wrapping a Failure, et cetera.
      if ( res instanceof Success || res instanceof Failure )
        return res;
      else
        return Success( res );
    }
    catch ( error ) { return Failure( error ); }
}

function TryAll( ops ) {

  if ( !Array.isArray( ops ) )
    throw TypeErr( "ops", "array", typeof ops );
  else
    return reduceTry( ops, Success(), 0 );

  function reduceTry( ops, acc, iter ) {

    if ( ops.length === iter || acc.isFailure )
      return acc;
    else if ( typeof ops[ iter ] !== "function" )
      throw TypeErr( `ops[ ${ iter } ]`, "function", typeof ops[ iter ] );
    else {
      return reduceTry(
        ops,
        Try( () => { return ops[ iter ]( acc.result ); } ),
        iter + 1
      );
    }
  }
}

module.exports = { Failure, Success, Try, TryAll };

