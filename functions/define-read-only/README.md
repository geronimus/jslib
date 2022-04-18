# defineReadOnly( obj, propertyMap )

Defines each key-value pair from the property map that you provide as an enumerable property on the target object - but one that cannot be changed or deleted.

## Examples

```javascript
const defineReadOnly = require( "@geronimus/define-read-only" );

const permanentRecord = {};

defineReadOnly(
  permanentRecord,
  {
    taxYear1929FilingDate: "1930-02-28",
    taxYear1930FilingDate: "1931-05-30"
  }
);

// Each property remains enumerable:
Object.keys( permanentRecord ); // => [ "taxYear1929FilingDate", "taxYear1930FilingDate" ]

// You cannot update them:
permanentRecord.taxYear1930FilingDate = "1931-03-31";
permanentRecord.taxYear1930FilingDate; // => "1931-05-30"

// You cannot delete them:
delete permanentRecord.taxYear1930FilingDate; // => false
permanentRecord.taxYear1930FilingDate; // => "1931-05-30"
```

## Parameters

`obj` *object*

The object to which the read-only, enumerable properties will be added. It must not be frozen.

`propertyMap` *object*

An ordinary object containing one or more key-value pairs to add to the target object.

As well as value properties, you can also define getter and setter functions.

## Notes

- Values from the `propertyMap` that are not primitive values (eg, objects ) will be added by reference. They will not be deep copies.
- Each property added will be enumerable, but not writable or configurable.
- The motivation for this function is to be able to easily add a list of immutable-yet-enumerable properties to an object. (Properties added with `Object.defineProperty` or `Object.defineProperties` are not enumerable by default.)
- For example, you can use it to add a "public interface" of methods and getter/setter properties to a constructor function's `this` reference, after calling the constructor function with the `new` keyword.

