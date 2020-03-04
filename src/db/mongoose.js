import mongoose from 'mongoose'

const dbUrl = process.env.MONGODB_URI || 'mongodb://mongo:27017/task-manager-db'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
