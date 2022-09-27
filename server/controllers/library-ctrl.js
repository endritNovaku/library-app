const Book = require('../models/library-models');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


cloudinary.config({ 
    cloud_name: 'dtyvusdbu', 
    api_key: '566745154413746', 
    api_secret: 'hjY6_YsVfXFU7VP413uZ82Q2pi8',
    secure: false
  });

console.log(cloudinary.config().cloud_name);

/* Create a new Book */
createBook = (req, res) => {
    const {name, category, description, author} = req.body
    let sampleFile = req.files.img
	let uploadPath = __dirname + '/uploads/' + sampleFile.name
	sampleFile.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err)
		}
	})

  cloudinary.uploader.upload(uploadPath, {
    resource: "image"
  })
  .then((result) => {
    if (result.format == "jpeg" || result.format == "jpg"){
        let arr = category.split(" ")
        let book = new Book({
            "name": name,
            "category": arr,
            "description": description,
            "author": author,
            "img": result.url,
            "public_url":result.public_id
        })
        book.save()
        .then(() => {
            return res.status(201).send(book);
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Book is not created!',
            })
        })
    } else {
        return res.status(422).send("The Image should be the type of JPEG or JPG")
    }
    })
  .catch((error) => {
    console.log(error);
  });


    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    if (!name || !description || !author || !category) {
        return res.status(400).json({ success: false, error: "Fill all the fields" })
    }
}

/*Update an existing Book */
updateBook = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

        let sampleFile = req.files.img
	    let uploadPath = __dirname + '/uploads/' + sampleFile.name
	    sampleFile.mv(uploadPath, function (err) {
		    if (err) {
			    return res.status(500).send(err)
		    }
	    })
    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Book not found!',
            })
        }

        cloudinary.uploader.upload(uploadPath, {
            resource: "image"
          })
          .then((result) => {
            if (result.format == "jpeg" || result.format == "jpg"){
                let cat = body.category.split(",")
                book.name = body.name
                book.category = cat
                book.description = body.description
                book.author = body.author
                book.img = result.url
                book
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            id: book._id,
                            message: 'Book updated!',
                        })
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Book not updated!',
                        })
                    })
                } else {
                    return res.status(422).send("The Image should be the type of JPEG or JPG")
                }
                })
              .catch((error) => {
                console.log(error);
              });
    })
}

/*Delete a book */
deleteBook = async (req, res) => {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        cloudinary.uploader.destroy(book.public_url).then(res => console.log(res));
        return res.status(200).json({ success: true, data: book })
    }).clone().catch(err => console.log(err))
}

getBookById = async (req, res) => {
    await Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: book })
    }).clone().catch(err => console.log(err))
}

getBooks = async (req, res) => {
    await Book.find({}, (err, books) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: books })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
}