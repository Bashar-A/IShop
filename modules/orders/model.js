const {Schema, model} = require('mongoose')

const Order = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    date: {type: Date, default: Date.now()},
    orderSum: Number,
    paymentType: String,
    status: String,
    address: String,
    comments: String,
    orderItems: [{
        product:{type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: Number
    }]
},{
    timestamps: true
})

module.exports = model('Order', Order)