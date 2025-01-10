const myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = "not read yet";
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

function addBookToLibrary(book) {
    book.push(myLibrary);
}

function viewLibrary(library) {
    library.forEach(book => {
        
    });
}