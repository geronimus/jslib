# range( lowerBound, upperBound )

Generates an array containing all of the integers between the two bounds that you specify. (Inclusive.)

## Examples

```javascript
const range = require( "@geronimus/range" );

console.log( range( 1, 5 ) );
// Expected output:
// => [ 1, 2, 3, 4, 5 ]
```

## Parameters

`lowerBound` *number*

The first number in the integer sequence that will be produced.

`upperBound` *number*

The last number in the integer sequence that will be produced.

## Notes

If either argument has a decimal part, it will be truncated.

Both bounds must be between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

`upperBound` must be greater than or equal to `lowerBound`.

The difference between the two bounds must be less than 4,294,967,296 (2<sup>32</sup>).

