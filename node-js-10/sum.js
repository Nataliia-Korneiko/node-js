function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Your input params are invalid')
  }

  return a + b
  // return 4
}

module.exports = sum
