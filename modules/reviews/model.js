const {Schema, model} = require('mongoose')

const Review = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    name: String,
    description: String
},{
    timestamps: true
})

module.exports = model('Review', Review)