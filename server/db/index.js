const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://goose:1fantastiku2@cluster0.gnyj584.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
