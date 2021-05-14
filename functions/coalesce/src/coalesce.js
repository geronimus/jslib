const { isNull } = require( "@geronimus/is-null" );

function coalesce( ...args ) {
  
  let result = undefined;

  if ( args.length < 1 )
    return result;

  for ( let item = 0; item < args.length; item++ ) {
    if ( !isNull( args[ item ] ) ) {
      result = args[ item ];
      break;
    }
  }

  if ( result === undefined )
    return args[ args.length - 1 ];
  else
    return result;
}

exports.coalesce = coalesce;

