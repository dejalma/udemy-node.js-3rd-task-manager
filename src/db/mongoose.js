import mongoose from 'mongoose'

//export MONGODB_URI='mongodb+srv://mongodb:k3HS0UszcmCcbKM5@dejalma-tbzy3.mongodb.net/test?retryWrites=true&w=majority'
//unset  MONGODB_URI
const dbUrl = process.env.MONGODB_URI || 'mongodb://mongo:27017/task-manager-api'

console.log(dbUrl)

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


import User from '../models/user.js'
import Task from '../models/task.js'

const me = new User({
    name: '   Bê ',
    email: 'dejalma.Arantes@gmail.com    ',
    password: 'passworxxxx                                    '
})

me.save().then((doc) => {
    console.log(doc)
}).catch((error) => {
    console.error(error)
})


const task = new Task({
    description: 'Make Bê sleep'
})

task.save().then((doc) => {
    console.log(doc);
}).catch((error) => {
    console.error(error);
})
