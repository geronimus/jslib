const { readdir, readFile, writeFile } = require( "fs" );
const { resolve } = require( "path" );

const root = resolve( __dirname, ".." );
const functions = resolve( root, "functions" );
const encoding = "utf8";
const sectionBreak = "\n\n---\n\n"

const headingfile = resolve( root, "resources", "README-Heading.md" );
const filename = "README.md"

const readmes = {};
let completed = false;
const timeout = 5000;
let timeoutId = null;

readdir( functions, { withFileTypes: true }, processDir );

function processDir( err, files ) {
  if ( err !== null )
    console.log( err );
  else {
    const subReadmes = files.filter( file => file.isDirectory() )
      .map( sub => resolve( functions, sub.name, filename ) )
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
    
    const megaReadme = buildMegaReadme( readmes );

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

function buildMegaReadme() {
  const heading = readmes[ headingfile ];

  const sections = Object.keys( readmes )
    .filter( key => key !== headingfile )
    .map( key => readmes[ key ] );
  
  const contentsLinks = sections
    .map( text => text.slice( 2, text.indexOf( "\n" ) ) )
    .map(
      section => `- [${ section.slice( 0, section.indexOf( "(" ) ) }]` +
        `(#${ section.replaceAll( /[^ 0-9A-Za-z]/g, "" ).replaceAll( " ", "-" ) })`
    );

    return [
      [ heading, contentsLinks.join( "\n" ), "\n" ].join( "\n" ),
      sections.join( sectionBreak ) 
    ].join( sectionBreak );
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

