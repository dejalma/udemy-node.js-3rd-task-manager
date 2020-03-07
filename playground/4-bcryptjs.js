import bcryptjs from 'bcryptjs'

const passwordHash = async (password, salt) => {
    const timer = 'TimeHash:' + salt
    console.time(timer)

    const hash = await bcryptjs.hash(password, salt)

    console.timeEnd(timer)

    return hash
}

const comparePasswordHash = async (password, hash, i) => {
    const timer = 'TimeCompareHash:' + i
    console.time(timer)

    const isValid = await bcryptjs.compareSync(password, hash)

    console.timeEnd(timer)

    return isValid
}

const LOOPS = 13
const PASSWORD = 'Bernardo Arantes'
let hashs = []

for (let i = 0; i < LOOPS; i++) {
    passwordHash(PASSWORD, i).then((hash) => {
        hashs[i] = hash
        console.log('Hash' + i + ':' + hash)

        //const sub = hashs[i].substring(0, hashs[i].length - 1) + '1'
        //console.log('Hash' + i + ':' + sub)

        return comparePasswordHash(PASSWORD, hash, i)
    }).then((isValid) => {
        console.log('CompareHash:' + i + ':' + isValid)
        console.log('-'.repeat(40))
    }).catch((error) => {
        console.log(error)
    })

}

