function TypeErr( param, expectedType, foundType ) {
  
  return new TypeError(
    `Parameter: ${ param }\n  ` +
      `Expected: ${ expectedType }\n  Found: ${ foundType }`
  );
}

module.exports = TypeErr;

