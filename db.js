const mongoose = require("mongoose");

const configureDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/desktop-counter-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connected to DB"))
    .catch(error => console.log("error in connecting to DB", error));
};

module.exports = configureDb;
