import '../src/db/mongoose.js'
import User from '../src/models/user.js'

User.findByIdAndUpdate('5e5fafa88625560686ca1457', { age: 2 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 2 })
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.error(error)
})
