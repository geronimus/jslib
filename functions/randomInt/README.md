# randomInt( lowerBound, upperBound )

Generates a pseudo-random integer value between the bounds that you specify. (Both inclusive.)

If either number has a decimal part, it will be truncated.

Both bounds must be between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

`upperBound` must be greater than `lowerBound`.

## Examples

```javascript
const { randomInt } = require( "@geronimus/randomint" );

const randomByteValue = randomInt( 0, 255 );
```

## Parameters

`lowerBound` *number*

The smallest of the values that you want to produce.

`upperBound` *number*

The largest of the values that you want to produce.

## Notes

This function uses `Math.random()` as a pseudo-random number generator.

Therefore, ***DO NOT*** use it for any purpose that must be cryptographically secure.

