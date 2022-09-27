const express = require('express')

const LibraryCtrl = require('../controllers/library-ctrl')

const router = express.Router()

router.post('/book', LibraryCtrl.createBook)
router.put('/book/:id', LibraryCtrl.updateBook)
router.delete('/book/:id', LibraryCtrl.deleteBook)
router.get('/book/:id', LibraryCtrl.getBookById)
router.get('/book', LibraryCtrl.getBooks)

module.exports = router