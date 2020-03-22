const calculateTip = (total, tipPercent = .10) => (total * tipPercent + total)

const fahrenheitToCelsius = (temp) => ((temp - 32) / 1.8)

const celsiusToFahrenheit= (temp) => ((temp * 1.8) + 32)

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if(a < 0 || b < 0) {
            return reject('the params must be non-negative')
        }

        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

export { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add }
