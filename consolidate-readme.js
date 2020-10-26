const { readdir, readFile, writeFile } = require( "fs" );

const root = ".";
const sep = "/";
const encoding = "utf8";
const sectionBreak = "\n\n---\n\n"

const headingfile = root + sep + "README-Heading.md";
const filename = "README.md"

const readmes = {};
let completed = false;
const timeout = 5000;
let timeoutId = null;

readdir( ".", { withFileTypes: true }, processDir );

function processDir( err, files ) {
  if ( err !== null )
    console.log( err );
  else {
    const subReadmes = files.filter(
      file => file.isDirectory() && !/^\..*/.test( file.name ) 
    )
      .map( sub => root + sep + sub.name + sep + filename )
      .sort();

    subReadmes.forEach( readme => {
      readmes[ readme ] = null;
    });

    // We are adding the heading file to the work list here so that its
    // completion doesn't end the process before the other items have
    // been defined.
    readmes[ headingfile ] = null;

    subReadmes.forEach( readme => {
      readFile( readme, encoding, receiveFile( readme ) );
    });

    readFile( headingfile, encoding, receiveFile( headingfile ) );

    timeoutId = setTimeout( finalCheck, timeout );
  }
}

function receiveFile( path, err, data ) {
  return ( err, data ) => {
    if ( err !== null )
      throw err;
    else {
      readmes[ path ] = data;
      checkCompleted();
    }
  }; 
}

function checkCompleted() {
  if (
    completed === false &&
      Object.keys( readmes ).every( key => readmes[ key ] !== null )
  ) {
    completed = true;

    if ( timeoutId !== null )
      clearTimeout( timeoutId );
    
    const megaReadme = readmes[ headingfile ] +
      sectionBreak +
      Object.keys( readmes )
        .filter( key => key !== headingfile )
        .map( key => readmes[ key ] )
        .join( sectionBreak );

    writeFile( root + sep + filename, megaReadme, printResult );

    return true;
  }
  else
    return false;
}

function printResult( err ) {
  if ( err !== null )
    throw err;
  else {
    console.log(
      "Successfully consolidated files [ " +
        Object.keys( readmes )
          .filter( key => key !== headingfile )
          .join( ", " ) +
        " ] into one file: " + root + sep + filename
    );
  }
}

function finalCheck() {
  if ( !checkCompleted() )
    console.log( 
      "Failed to consolidate README.md files.\n" +
        `  Timed out after ${ timeout / 1000  } seconds.\n` +
        "  File read result table follows:\n\n" +
        readmes
    );
}

