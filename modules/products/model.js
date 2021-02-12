const {Schema, model} = require('mongoose')

const Product = new Schema({
    name: String,
    priceExVat: Number,
    promoPrice: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    attributes:[
        {
            attribute: {type: Schema.Types.ObjectId, ref: 'Attribute'},
            value: String
        }
    ],
    images:[String],
    stock: Number,
    onSale: Boolean
},{
    timestamps: true
})

module.exports = model('Product', Product)