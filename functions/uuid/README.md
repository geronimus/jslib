# uuid()

Generates a Universally Unique Identifier, based on variant 4 (random) of the [Internet Engineering Task Force (IETF) Request for Comments (RFC) 4122](https://tools.ietf.org/html/rfc4122) proposal.

Specifically, this function generates its canonical string representation.

## Examples

```javascript
const { uuid } = require( "@geronimus/uuid" );

console.log( uuid() );
// Expected output:
// => "8afe0169-17a2-4091-8375-30ca1d4333ab" (Or similar.)

const id1 = uuid();
const id2 = uuid();

if ( id1 === id2 )
  console.log( "It's an impossible coincidence!" );
else
  console.log( "Each value is unique." );
```

## Notes

The randomness of this function depends on `Math.random()`. Therefore, it ***MUST NOT*** be used for any purpose requiring cryptographic security.

