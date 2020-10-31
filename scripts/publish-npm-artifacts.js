const { resolve } = require( "path" );
const { copyFile, readFile, writeFile } = require( "fs" );

// References
const licence = "LICENCE";
const readme = "README.md";
const pkgJson = "package.json"

const projectRoot = resolve( __dirname, ".." );
const sourceLicence = resolve( projectRoot, licence );
const pkgs = [
  "coalesce",
  "isEmpty",
  "isNull"
];
const listSep = "\n  ";

if (
  process.argv.length < 3 ||
    !pkgs.includes( process.argv[ 2 ] )
)
  throw "Please provide one of the following items as an argument when " +
    "calling publish-npm-artifacts:" + listSep +
    pkgs.join( listSep );

const pkg = process.argv[ 2 ];
const pkgRoot = resolve( projectRoot, pkg );
const sourceReadme = resolve( pkgRoot, readme );
const sourcePkgJson = resolve( pkgRoot, pkgJson );

const dist = resolve( pkgRoot, "dist" );
const targetLicence = resolve( dist, licence );
const targetReadme = resolve( dist, readme );
const targetPkgJson = resolve( dist, pkgJson );
const filterOut = [ "devDependencies", "scripts" ];

copyFile( sourceLicence, targetLicence, reportResult( targetLicence ) );
copyFile( sourceReadme, targetReadme, reportResult( targetReadme ) );
publishPkgJson( sourcePkgJson, targetPkgJson );

function reportResult( file ) {
  return err => {
    if ( err !== null )
      throw err;
    else
      console.log( `Successfully created: \n  ${ file }` );
  };
}

function publishPkgJson( sourcePkgJson, targetPkgJson ) {

  readFile( sourcePkgJson, processPkgJson );

  function processPkgJson( err, pkgString ) {
    if ( err !== null )
      throw err;
    else {
      const pkgObj = JSON.parse( pkgString );
      const publishedPkgObj = filterObj( pkgObj, filterOut );
      publishedPkgObj.main = `${ pkg }.js`;

      writeFile(
        targetPkgJson,
        JSON.stringify( publishedPkgObj, null, 2 ),
        reportResult( targetPkgJson )
      );
    }
  }

  function filterObj( obj, filterProps ) {
    const finalProps = Object.keys( obj )
      .filter( prop => !filterProps.includes( prop ) );

    const result = {};
    finalProps.forEach(
      key => { result[ key ] = obj[ key ]; }
    );

    return result;
  }
}

