const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
    {
        category: {type:String, required: true},
        books: {
            type: [String],
            validate: v => Array.isArray(v) && v.length > 0,
        }
    })



module.exports = mongoose.model('categories', Category);