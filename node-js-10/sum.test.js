const sum = require('./sum')

describe('Should test sum function', () => {
  // beforeEach(() => {
  //   console.log('before')
  // })

  // afterEach(() => {
  //   console.log('after')
  // })

  it('Should test that 2 plus 2 equals 4', () => {
    // expect(sum(2, 2)).toBe(4)
    expect(sum(2, 2)).toBe(4)
  })

  it('Should test that 5 plus 3 equals 8', () => {
    expect(sum(5, 3)).toBe(8)
  })

  it('Should throw error if input params are invalid', () => {
    expect(() => sum('hello', 'word')).toThrow()
  })
})
