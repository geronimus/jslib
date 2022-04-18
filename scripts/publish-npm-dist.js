const { existsSync } = require( "fs" );
const { copyFile, mkdir } = require( "fs/promises" );
const path = require( "path" );
const {
  getChildFileInfo,
  getChildFileInfoRecursive
} = require( "./file-info" );

const worklist = {
  commonFiles: [
    "README.md",
    "package.json",
    "package-lock.json"
  ],
  directoriesToMake: new Set(),
  distRoot: undefined,
  filesToCopy: [],
  functionList: [],
  functionRoot: undefined,
  projectRoot: path.join( __dirname, ".." ),
  srcRoot: undefined
};

validateTarget( process.argv[ 2 ] )
  .then( getSrcRoot )
  .then( getDistRoot )
  .then( getSrcFiles )
  .then( getCommonFiles )
  .then( getDirectoriesToMake )
  .then( makeTargetDirectories )
  .then( copyFiles );

async function copyFiles() {

  return Promise.all(
    worklist.filesToCopy
      .map( item => logAndCopy( item ) )
  );

  async function logAndCopy( item ) {

    console.log(
      `Copying file:\n  ${ item.source }\n` +
        `To destination:\n  ${ item.destination }`
    );
    return copyFile( item.source, item.destination );
  }
}

async function getCommonFiles() {

  const common = worklist.commonFiles
    .map( filename => path.join( worklist.functionRoot, filename ) );

  common
    .filter( filepath => existsSync( filepath ) )
    .forEach( filepath => {
      worklist.filesToCopy.push({
        source: filepath,
        destination: filepath.replace(
          worklist.functionRoot,
          worklist.distRoot
        )
      });
    });
}

async function getDistRoot() {
  
  const distDir = path.join( worklist.functionRoot, "dist" );

  worklist.distRoot = distDir;

  if ( !existsSync( distDir ) )
    return mkdir( distDir );
}

async function getDirectoriesToMake() {

  worklist.filesToCopy
    .map( copyItem => path.dirname( copyItem.destination ) )
    .filter( dir => !existsSync( dir ) )
    .forEach( dir => {
      worklist.directoriesToMake.add( dir );
    });
}

async function getSrcFiles() {

  ( await getChildFileInfoRecursive( worklist.srcRoot ) )
    .forEach( srcFileInfo => {
      worklist.filesToCopy.push({
        source: srcFileInfo.fullName,
        destination: srcFileInfo.fullName.replace(
          worklist.srcRoot,
          worklist.distRoot
        )
      });
    })
}

async function getSrcRoot() {

  const srcDir = path.join( worklist.functionRoot, "src" );

  if ( !existsSync( srcDir ) )
    throw new Error(
      `Could not locate function source root directory: ${ srcDir }`
    );
  else
    worklist.srcRoot = srcDir;
}

async function makeTargetDirectories() {

  return Promise.all(
    Array.from( worklist.directoriesToMake )
      .sort()
      .reverse()
      .map( dir => mkdir( dir, { recursive: true } ) )
  );
}

async function validateTarget( target ) {

  if ( typeof target !== "string" || target.length < 1 )
    throw new TypeError( `Invalid build target: ${ target }` );

  const funcs = path.join( worklist.projectRoot, "functions" );

  ( await getChildFileInfo( funcs ) )
    .forEach( fileInfo => { worklist.functionList.push( fileInfo.name ); } )

  if ( !worklist.functionList.includes( target ) ) {
    console.log(
      `Error: Target directory ${ target } is not one of this project's ` +
        "supported functions."
    );
    console.log( worklist.functionList );
    throw new Error( `Illegal argument: ${ target }` );
  } else
    worklist.functionRoot = path.join( funcs, target );
}

