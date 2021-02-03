const {Schema, model} = require('mongoose')

const Attribute = new Schema({
    name: String,
    description: String
},{
    timestamps: true
})

module.exports = model('Attribute', Attribute)