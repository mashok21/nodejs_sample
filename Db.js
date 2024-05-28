const mongoose = require('mongoose')

const configureDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/task-app")
    .then(() => console.log('connecting to db'))
    .catch(error => console.log(error))
}

module.exports = configureDb