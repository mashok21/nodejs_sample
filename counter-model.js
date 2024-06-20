const mongoose = require("mongoose")

const {Schema, model} = mongoose

const CounterSchema = new Schema({
    value: {
        type: Number, 
        required: true, 
        default: 0
    }
})

const Counter = model("Counter", CounterSchema)

module.exports = Counter