const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const db = require('./db')
const libraryRouter = require('./routes/library-router')
const authorRouter = require('./routes/author-router')
const categoryRouter = require('./routes/category-router')
const app = express()
const apiPort = 5000

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

app.use(fileUpload())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors(corsOptions))


app.use(express.static('/public'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello')
  });

  console.log('')

app.use('/api', libraryRouter);
app.use('/api', authorRouter);
app.use('/api', categoryRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))