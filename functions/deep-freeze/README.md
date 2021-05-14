# deepFreeze( obj )

Recursively freezes an object, and all objects referenced in that object's properties. (And so on...)

## Examples

```javascript
const { deepFreeze } = require( "@geronimus/deep-freeze" );

const box = {
  height: 20,
  width: 30,
  colour: {
    name: "sea red",
    rgb: {
      red: 244,
      green: 112,
      blue: 112
    }
  }
};

const returnValue = deepFreeze( box );

// The object is frozen in place, as well as returned.
returnValue === box; // => true

// You can no longer mess with any of its properties,
// no matter how deeply nested.
box.height = 10;
box.colour.name = "smokey pink";
box.colour.rgb.red = 255;

box.height; // => 20
box.colour.name; // => "sea red"
box.colour.rgb.red; // => 244

Object.isFrozen( box.colour.rgb ); // => true
```

## Parameters

`obj` *object*

The object you wish to deeply freeze. It will be frozen in place, as well as returned. (No element of it is not copied.)

## Returns

*object*

The same object that gets passed in as `obj`, recursively frozen.

