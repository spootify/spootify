let functions = require('./functions');

test('functionOne should return 2', () => {
    let result = functions.functionOne(1,1);
    expect(result).toBe(2)
})

test('functionOne should return 10', () => {
    let result = functions.functionOne(5,5);
    expect(result).toBe(10)
})

test('functionOne should return 20', () => {
    let result = functions.functionOne(10,10);
    expect(result).toBe(20)
})

test('functionOne should return 100', () => {
    let result = functions.functionOne(50,50);
    expect(result).toBe(100)
})

test('functionOne should return 60', () => {
    let result = functions.functionOne(30,30);
    expect(result).toBe(60)
})