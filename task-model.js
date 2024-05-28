const mongoose = require('mongoose')

const {Schema, model} = mongoose

const tasksSchema = new Schema({
    title:  String,
    description: String, 
    status: String,
}, {timestamps: true})

const Task = model('Task', tasksSchema)

module.exports = Task