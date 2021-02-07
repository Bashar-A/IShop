const {Schema, model} = require('mongoose')

const User = new Schema({
    email:{
        type: String,
        required: true
    },
    name: String,
    salt: String,
    password: String,
    isAdmin: {typle: Boolean, default: false},
    resetToken: String,
    resetTokenExp: Date
},{
    timestamps: true
})

module.exports = model('User', User)