import * as Math from '../src/math.js'

test('Should calculate total with tip', () => {
    const total = Math.calculateTip(10, .30)
    expect(total).toBe(13)

    // if (total !== 13) {
    //     throw new Error('Total should be 13. Got ' + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = Math.calculateTip(10)
    expect(total).toBe(11)
})

test('Should convert 32 F to 0 C', () => {
    const celsius = Math.fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const fahrenheit = Math.celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 1000)
})

test('Should add two numbers', (done) => {
    Math.add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await Math.add(10, 22)
    expect(sum).toBe(32)
})

test('Should not add a negative', async() => {
    const sum = await Math.add(-1,0).catch((error) => {
        expect(error).toBe('the params must be non-negative')
    })
    expect(sum).toBeUndefined() //não deveria chegar aqui
})


test('Should not add b negative', async() => {
    const sum = await Math.add(0,-1).catch((error) => {
        expect(error).toBe('the params must be non-negative')
    })
    expect(sum).toBeUndefined() //não deveria chegar aqui
})