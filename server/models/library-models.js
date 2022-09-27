const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema(
    {
        name: {type:String, required: true},
        category: {
            type: [String],
            validate: v => Array.isArray(v) && v.length > 0,
        },
        description: {type: String, required: true},
        author: {type: String, required: true},
        img: {type: String, required: true},
        public_url: {type: String, required: true}
    },
    { timestamps: true },
)



module.exports = mongoose.model('books', Book);