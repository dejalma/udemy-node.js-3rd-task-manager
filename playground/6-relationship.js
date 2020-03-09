import '../src/db/mongoose.js'
import User from '../src/models/user.js'
import Task from '../src/models/task.js'

const main = async () => {
    const task = await Task.findById('5e65c85116829909b301b480')
    await task.populate('owner').execPopulate()
    console.log(task)

    const user = await User.findById('5e65c5af1faf6b09620ee7f3')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
