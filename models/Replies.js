const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    author : String,
    description : String
})

const replyModel = mongoose.model('Reply', replySchema)

module.exports = replyModel