const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
    author : String,
    head: String,
    body: String,
    likes : {
        type : Number,
        default : 0,
    },
    replies : [{type : String}]
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
})

const doubtModel = mongoose.model('Doubt', doubtSchema)

module.exports = doubtModel