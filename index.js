const express = require("express")
const cors = require('cors')
const configureDb = require("./config/db.js")
// const {checkSchema} = require('express-validator')
const counterCtrl = require("./app/controller/counter-ctrl.js")
// const expenseCtrl = require("./app/controller/expense-ctrl.js")
// const {categoryValidationSchema, categoryIdValidationSchema} = require('./app/validator/category-validator.js')
// const {expenseValidationSchema, expenseIdValidationSchema} = require('./app/validator/expense-validator.js')

const app = express()
const port = 3010

app.use(express.json())
app.use(cors())
configureDb()

app.get("/", counterCtrl.home)
app.post("/counter", counterCtrl.create)
app.get('/counterslist', counterCtrl.list)
app.put('/counter/:id', counterCtrl.update)


app.listen(port, () => {
    console.log("server running on port", port)
})