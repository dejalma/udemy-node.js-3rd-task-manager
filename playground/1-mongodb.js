import mongodb from 'mongodb'
import * as assert from 'assert'

const { MongoClient, ObjectID } = mongodb

const mongodbUrl = 'mongodb://mongo:27017'
const dbName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.toHexString().length)
console.log(id.id)
console.log(id.id.length)
console.log(id.getTimestamp())

MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, (error, client) => {
    assert.equal(null, error, "Conection failed!")

    console.log('Connected!')

    const db = client.db(dbName)

    db.collection('users').insertOne({
        _id: id,
        name: 'Bernardo',
        age: 4
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user.')
        }
        console.log(result.ops)
    })

    db.collection('users').insertMany([
        { name: 'Ana', age: 14 },
        { name: 'Eliza', age: 50 }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert users.')
        }
        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        { description: 'Node.js course', completed: false },
        { description: 'Docker install', completed: true },
        { description: 'Take care of Bê', completed: true}
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks.')
        }
        console.log(result.ops)
    })

    db.collection('users').findOne({name: 'Bernardo'}, (error, user) => {
        if (error) return console.log('Unable to find.')
        console.log(user)
    })

    db.collection('users').findOne({_id: new ObjectID('5e5a5f2653e0e8003d42caa5')}, (error, user) => {
        if (error) return console.log('Unable to find.')
        console.log(user)
    })

    db.collection('users').find({age: 4}).toArray((error, docs) => {
        if (error) return console.log('Age not found.')
        console.log(docs)
    })

    db.collection('users').find({age: 4}).count((error, count) => {
        if (error) return console.log('Age not found.')
        console.log(count)
    })

    db.collection('tasks').findOne({ _id: new ObjectID('5e5a65bf2639e5006907d491') }, (error, docs) => {
        console.log(docs)
    })


    db.collection('tasks').find({ completed: false }).toArray((error, docs) => {
        console.log(docs)
    })

    db.collection('tasks').find({ description: { $regex: '.*insta.*' } }).toArray((error, docs) => {
        console.log(docs)
    })

    db.collection('users').updateOne({
        _id: new ObjectID("5e5a625fa802d300487629f1")
    }, {
        $set: {
            name: "Bê Arantes"
        }, 
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').updateMany({
        name: {
            $regex: '.*Bernardo.*'
        }
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').deleteMany({
        age: 5
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description: 'Docker install'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
