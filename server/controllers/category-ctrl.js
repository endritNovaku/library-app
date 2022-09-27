const Category = require('../models/category-model');
const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://goose:1fantastiku2@cluster0.a8mfa.mongodb.net/Library?retryWrites=true&w=majority'

const books = new MongoClient(uri);




createCategory = (req, res) => {
    const {category} = req.body
    let book = []
    async function run() {
        try {
          await books.connect();
          const db = books.db('Library');
            const coll = db.collection('books')
            const course = coll.find()
            await course.forEach(element => {
                for (let i = 0; i < element.category.length; i++) {
                    if (element.category[i] == category) {
                        book.push(element.name)
                    }
            }});
            let cat = new Category({
                "category": category,
                "books": book
            })
            cat.save()
            .then(() => {
                return res.status(201).send(cat);
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Category is not created!',
                })
            })
        
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    error: 'You must provide a Category',
                })
            }
        
            if (!category) {
                return res.status(400).json({ success: false, error: "Fill all the fields" })
            }
        } finally {
          // Ensures that the client will close when you finish/error
          await books.close();
        }
      }
      run()

}


updateCategory = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Category.findOne({ _id: req.params.id }, (err, cat) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Category not found!',
            })
        }
        let book = []
        async function run() {
            try {
              await books.connect();
              const db = books.db('library1');
                const coll = db.collection('books')
                const course = coll.find()
                await course.forEach(element => {
                    for (let i = 0; i < element.category.length; i++) {
                        if (element.category[i] == body.category) {
                            book.push(element._id)
                        }
                }});

                cat.category = body.category
                cat.books = book
            cat.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: cat._id,
                    message: 'Category updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Category not updated!',
                })
            })
    
                
            } finally {
              // Ensures that the client will close when you finish/error
              await books.close();
            }
          }
          run()
        })}

deleteCategory = async (req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    
        if (!category) {
            return res
                .status(404)
                .json({ success: false, error: `Category not found` })
        }
    
        return res.status(200).json({ success: true, data: category })
    }).clone().catch(err => console.log(err))
}

getCategoryById = async (req, res) => {
    await Category.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!category) {
            return res
                .status(404)
                .json({ success: false, error: `Category not found` })
        }
        return res.status(200).json({ success: true, data: category })
    }).clone().catch(err => console.log(err))
}

getCategories = async (req, res) => {
    await Category.find({}, (err, categories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!categories.length) {
            return res
                .status(404)
                .json({ success: false, error: `Categories not found` })
        }
        return res.status(200).json({ success: true, data: categories })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById
}