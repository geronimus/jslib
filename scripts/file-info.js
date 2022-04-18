const { existsSync } = require( "fs" );
const { readdir, stat } = require( "fs/promises" );
const path = require( "path" );

async function getChildFileInfo( startDir ) {

  if ( typeof startDir !== "string" )
    throw new TypeError(
      "Argument `startDir` must be a string representing a path."
    );
    
  if ( !existsSync( startDir ) || !isDirectory( startDir ) )
      return Promise.resolve( [] );

  return getAllChildren( path.resolve( startDir ) );

  async function getAllChildren( startDir ) {

    const childInfo = await readdir( startDir, { withFileTypes: true } );
    
    return childInfo.map( dirent => {
      return Object.freeze({
        fullName: `${ path.resolve( startDir, dirent.name ) }`,
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
        isSymbolicLink: dirent.isSymbolicLink(),
        name: dirent.name,
        parentDirectory: `${ path.resolve( startDir ) }`
      });
    });
  }

  async function isDirectory( pathString ) {

    return ( await stat( pathString ) ).isDirectory();
  }
}

async function getChildFileInfoRecursive( startDir ) {

  return sortResults( await recurse( startDir ) );

  async function recurse( startDir, acc = [] ) {

    const childInfo = await getChildFileInfo( startDir );
  
    if ( childInfo.length < 1 )
      return acc;
    else {
      const dirs = childInfo
        .filter( item => item.isDirectory )
        .map( item => item.fullName );
  
      return await reducer( dirs, acc.concat( childInfo ) );
    }
  }

  async function reducer( dirs, acc = [] ) {

    if ( dirs.length < 1 )
      return acc;
    else {
      return reducer(
        dirs.slice( 1 ),
        await recurse( dirs[ 0 ], acc.slice( 0 ) )
      );
    }
  }

  function sortResults( resultArray ) {

    return resultArray
      .slice( 0 )
      .sort( ( first, second ) => {
        return first.fullName.localeCompare( second.fullName );
      });
  }
}

module.exports = {
  getChildFileInfo,
  getChildFileInfoRecursive
};
