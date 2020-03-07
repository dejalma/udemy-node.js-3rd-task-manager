import mongoose from 'mongoose'
import validator from 'validator'
import bycrypt from 'bcryptjs'

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
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('E-mail is invalid.')
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
    }
})

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, HASH_ITERATIONS)
    }
    
    next()
})

const User = mongoose.model('User', UserSchema)

export default User
