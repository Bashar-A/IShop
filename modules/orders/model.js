const { Double } = require('bson')
const {Schema, model} = require('mongoose')

const Order = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    date: Date,
    orderSum: Number,
    paymentType: String,
    status: String,
    address: String,
    comments: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
},{
    timestamps: true
})

module.exports = model('Order', Order)