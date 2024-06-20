const Counter = require("../model/counter-model")
// const {validationResult} = require('express-validator')
const counterCtrl = {}

counterCtrl.home = (req, res) => {
    res.send("Hello, World!")
}

counterCtrl.create = (req, res) => {
    // const errors = validationResult(req)
    // console.log(errors)
    // if (!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // }
    const body = req.body
    const counter = new Counter(body)
    counter.save()
    .then(data => {
        res.status(201).json(data)
    })
    .catch(errors => {
        res.status(500).json({errors: "Something went wrong" })
    }); 
}

counterCtrl.list = (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // }
    Counter.find()
    .then(counters => {
        res.json(counters)
    })
    .catch(errors => res.status(500).json({errors : "Something went wrong"}))
}

counterCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Counter.findByIdAndUpdate(id, body, {new: true})
        .then(counter => {
            if(!counter){
                return res.status(404).json({error: 'record not found'})
            }
            res.json(counter)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "something went wrong"})
        })
}

module.exports = counterCtrl