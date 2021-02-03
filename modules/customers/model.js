const {Schema, model} = require('mongoose')

const Customer = new Schema({
    firstname: String,
    secondname: String,
    lastname: String,
    email: String,
    phone: String
},{
    timestamps: true
})

module.exports = model('Customer', Customer)