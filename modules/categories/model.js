const {Schema, model} = require('mongoose')

const Category = new Schema({
    name: String,
    description: String,
    image: String,
    parent:{type: Schema.Types.ObjectId, default: 0}
},{
    timestamps: true
})

module.exports = model('Category', Category)