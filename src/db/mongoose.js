import mongoose from 'mongoose'

const dbUrl = process.env.MONGODB_URI || 'mongodb://mongo:27017/task-manager-db'

console.log(dbUrl)

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// import User from '../models/user.js'
// import Task from '../models/task.js'

// const me = new User({
//     name: '   Bê ',
//     email: 'dejalma.Arantes@gmail.com    ',
//     password: 'passworxxxx                                    '
// })

// me.save().then((doc) => {
//     console.log(doc)
// }).catch((error) => {
//     console.error(error)
// })


// const task = new Task({
//     description: 'Make Bê sleep'
// })

// task.save().then((doc) => {
//     console.log(doc);
// }).catch((error) => {
//     console.error(error);
// })
