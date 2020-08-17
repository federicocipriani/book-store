// ES5 IMPLEMENTATION

// -----------------------------------------------------
// Book constructor -> creates the actual book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// -----------------------------------------------------
// UI constructor -> set of prototypes methods
function UI() {}
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</td>
    `;
    list.appendChild(row);
};

// Delete book from table
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

// Clear form fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

// Show alert when book is added or removed + error message
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

// -----------------------------------------------------
// Event listeners - Upload book
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
        ui.showAlert('Book added', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener - Delete button
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        const ui = new UI();
        ui.deleteBook(e.target);
        ui.showAlert('Book removed', 'success');
        e.preventDefault();
    }
});
