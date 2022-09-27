const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://goose:1fantastiku2@cluster0.a8mfa.mongodb.net/Library?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db