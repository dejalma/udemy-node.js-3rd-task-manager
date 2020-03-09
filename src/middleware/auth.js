import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const SECRET_JWT = 'node.js Andrew Mead´s Udemy course secret seed 123@#$%¨&*(~ç'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        
        const decoded = jwt.verify(token, SECRET_JWT)
        console.log(decoded)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(404).send({ error: 'Please authenticate.' })
    }
}

export default auth