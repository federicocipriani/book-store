// ES6 IMPLEMENTATION

// -----------------------------------------------------
// BOOK CLASS
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// -----------------------------------------------------
// UI CLASS
class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
        `;
        list.appendChild(row);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// -----------------------------------------------------
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => {
            const ui = new UI();
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, i) => {
            if (book.isbn === isbn) {
                books.splice(i, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// -----------------------------------------------------
// Event listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiating the book
    const book = new Book(title, author, isbn);

    // Instantiating the UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill the fields', 'error');
    } else {
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert('Book added', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener - DELETE BUTTON
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        const ui = new UI();
        ui.deleteBook(e.target);
        Store.removeBook(
            e.target.parentElement.previousElementSibling.textContent
        );
        ui.showAlert('Book removed', 'success');
        e.preventDefault();
    }
});
