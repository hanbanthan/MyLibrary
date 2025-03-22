const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

authorSchema.pre('remove', async function(next) {
    try {
        const books = await Book.find({ author: this.id });
        if (books.length > 0) {
            next(new Error('This author still has books.'));
        } else {
            next();
        }

    } catch (err) {
        next(err);
    }
})

module.exports = mongoose.model('Author', authorSchema);