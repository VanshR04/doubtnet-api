const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password : String
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel