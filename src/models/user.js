import mongoose from 'mongoose'
import validator from 'validator'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Task from './task.js'

const HASH_ITERATIONS = 9

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('E-mail is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.search(new RegExp("password", "i")) >= 0) {
                throw new Error("Password contains 'password'.")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bycrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

const SECRET_JWT = 'node.js Andrew Mead´s Udemy course secret seed 123@#$%¨&*(~ç'

UserSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, SECRET_JWT)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, HASH_ITERATIONS)
    }

    next()
})

UserSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})

const User = mongoose.model('User', UserSchema)

export default User
