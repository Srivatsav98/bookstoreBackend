const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String},
    author: { type: String},
    price: { type: Number},
    year: { type: String},
    rating: { type: Number},
    publisher:{type:String},
    createOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Books', bookSchema)