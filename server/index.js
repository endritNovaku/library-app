const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const libraryRouter = require('./routes/library-router')

const app = express()
const apiPort = 3000


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', libraryRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))