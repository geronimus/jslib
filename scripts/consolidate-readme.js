const { readdir, readFile, writeFile } = require( "fs" );
const { resolve } = require( "path" );

const root = resolve( __dirname, ".." );
const encoding = "utf8";
const sectionBreak = "\n\n---\n\n"

const headingfile = resolve( root, "resources", "README-Heading.md" );
const exclude = [ ".git", "resources", "scripts" ];
const filename = "README.md"

const readmes = {};
let completed = false;
const timeout = 5000;
let timeoutId = null;

readdir( root, { withFileTypes: true }, processDir );

function processDir( err, files ) {
  if ( err !== null )
    console.log( err );
  else {
    const subReadmes = files.filter(
      file => file.isDirectory() && !exclude.includes( file.name ) 
    )
      .map( sub => resolve( root, sub.name, filename ) )
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

    writeFile(
      resolve( root, filename ),
      megaReadme,
      printResult
    );

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
      "Successfully consolidated files:\n  " +
        Object.keys( readmes )
          .filter( key => key !== headingfile )
          .join( "\n  " ) +
        "\n... into one file: \n  " + resolve( root, filename )
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

