const express = require('express')
const cors =  require('cors')
const validator = require('express-validator')
const app = express()
const port = 4000
const path = require('path');
const configureDb = require(path.join(__dirname, 'config', 'Db'));
const taskCtrl = require('./app/controller/task-ctrl')
const {taskValidatorSchema, idValidationSchema} = require(path.join(__dirname, 'app','validator', 'task-validator'));


// middleware
app.use(express.json())
app.use(cors())

configureDb()


const {checkSchema} = validator

app.get('/api/tasks', taskCtrl.list)
app.get('/api/tasks/:id', checkSchema(idValidationSchema), taskCtrl.listById)
app.put('/api/tasks/:id', checkSchema(idValidationSchema), checkSchema(taskValidatorSchema), taskCtrl.update)
app.post('/api/tasks', checkSchema(taskValidatorSchema), taskCtrl.create)
app.delete('/api/tasks/:id', checkSchema(idValidationSchema), taskCtrl.remove)


app.listen(port, () => {
    console.log("server running on port:", port)
})