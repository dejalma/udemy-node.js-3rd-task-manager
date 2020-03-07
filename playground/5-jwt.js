import jwt from 'jsonwebtoken'

const SEED = '873498%$@#$¨&*jhksabgdajç'

const testToken = async () => {
    const token = jwt.sign({_id: '123'}, SEED, { expiresIn: '2 days'})
    console.log(token)

    const data = jwt.verify(token, SEED)
    console.log(data)
}

testToken()