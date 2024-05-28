const Task = require('../model/task-model')
const {validationResult} = require('express-validator')
const taskCtrl = {}

taskCtrl.list = (req, res) => {
    Task.find()
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.status(500).json({error : 'Something went wrong'})
        })
}


taskCtrl.create = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    const task = new Task(body)
    task.save()
        .then(task => {
            res.status(201).json(task)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "something went wrong"})
        })
}

taskCtrl.remove = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id    
    Task.findByIdAndDelete(id)
        .then(task => {
            if(!task){
                return res.status(404).json({error: 'record not found'})
            }
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}

taskCtrl.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body, {new: true})
        .then(task => {
            if(!task){
                return res.status(404).json({error: 'record not found'})
            }
            res.json(task)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "something went wrong"})
        })
}

taskCtrl.listById = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id
    Task.findById(id)
        .then(task => {
            if(!task){
                return res.status(404).json({error: 'record not found'})
            }
            res.json(task)
        })
        .catch(err => {
            res.status(500).json({error :  'Something went wrong'})
        })
}

module.exports = taskCtrl

