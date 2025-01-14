class Book {
    constructor(title, author, available = true) {
        this.title = title;
        this.author = author;
        this.available = available;
    }
}

const library = {
    books: [],

    addBook: function (title, author) {
        const book = new Book(title, author);
        this.book.push(book);
        console.log(`Added "${book.title}" by ${book.author} to the library! There are now ${this.available} books in the library's database.`);
    },

    checkOutBook: function(title) {
        try {
            for (let book of this.books) {
                if (book.title === title && book.available) {
                    found = true;
                    book.available = false;
                    console.log(`Checked out: ${book.title}`)
                    break;
                }
            }
            if (!found) throw new Error(`The book: "${title}" was not found or already checked out.`);
        } catch(error) {
            console.error(error.message);
        }
    },

    getAvailableBooks: function() {
        let bookList = []
        for (let book of this.books) {
            if (book.available) {
                bookList.push(book.title);
            }
        }
        console.log(`There are ${bookList.length} titles currently on the shelf: ${bookList.join(", ")}`);
    }
}

const newBooks = 
    `[
        {"title": "Eloquent JavaScript", "author": "Marijin Haverbeke"},
        {"title": "JavaScript: The Good Parts", "author": "Douglas Crockford"},
        {"title": "You Don't Know JS: Scope & Closures", "author": "Kyle Simpson"},
        {"title": "Effective JavaScript: 68 Specific Ways to harness the Power of JavaScript", "author": "David Herman"},
        {"title": "JavaScript Patterns", "author": "Stoyan Stefanov"},
        {"title": "Programming JavaScript Applications", "author": "Eric Elliott "},
        {"title": "Functional JavaScript", "author": "Michael Fogus"},
        {"title": "JavaScript: The Definitive Guide", "author": "David Flanagan"},
        {"title": "Learning JavaScript Design Patterns", "author": "Addy Osmani"},
        {"title": "Node.js Design Patterns", "author": "Mario Casciaro"},
    ]`;

function receiveBooks(bookData) {
    console.log(`Adding new books to our shelves!`);
    const booksToAdd = JSON.parse(bookData);
    for (let book of booksToAdd) {
        library.addBook(book.title, book,author);
    }
}

// Tests
console.log(`There are currently ${library.books.length} books in the library's database.`);
library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
library.checkOutBook("Eloquent JavaScript");
library.checkOutBook("Grokking the Coding Interview");
library.getAvailableBooks();