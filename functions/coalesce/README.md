# coalesce( [ value1, [ value2, [ ... ] ] ] )

As in SQL, `coalesce()` returns its first argument that is neither `null` nor `undefined`.

## Examples

```javascript
const coalesce = require( "@geronimus/coalesce" );

const result = coalesce(
  couldProduceNull( option1 ),
  couldProduceNull( option2 ),
  "default result"
);
```

## Parameters

`value1` *any*, `value2` *any*, ...

Any number of values or expressions. The first that does not evaluate to `null` or `undefined` will be returned.

