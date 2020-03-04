import '../src/db/mongoose.js'
import Task from '../src/models/task.js'

Task.findByIdAndDelete('5e5fb4c2c8961806d84b0cb1').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})

const deleteTaskByIdAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

deleteTaskByIdAndCount('5e5fb4c2c8961806d84b0cb1').then((count) => {
    console.log('count', count)
}).catch((error) => {
    console.log(error)
})