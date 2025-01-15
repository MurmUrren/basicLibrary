const myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

function addBookToLibrary(name, author, pages, read) {
    let book = new Book(name, author, pages);
    book.push(myLibrary);
}

function viewLibrary(library) {
    library.forEach(book => {
        let bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        let bookName = document.createElement('h3');
        bookName.textContent = book.name;
        let bookAuthor = document.createElement('h4');
        bookAuthor.textContent = book.author;
        let bookPages = document.createElement('h5');
        bookPages.textContent = `Pages: ${book.pages}`;

        bookCard.appendChild(bookName);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);

        libraryDiv.appendChild(bookCard);
    });
}

let libraryDiv = document.querySelector('.library-display');

let newBookBtn = document.getElementById('new-book');
let newBookPopup = document.querySelector('.new-book-form');
let closePopupBtn = document.getElementById('close');

newBookBtn.addEventListener("click", () => {
    newBookPopup.showModal();
})

closePopupBtn.addEventListener("click", (e) => {
    newBookPopup.close();
})

const exampleBooks = [
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180),
    new Book('To Kill a Mockingbird', 'Harper Lee', 281),
    new Book('1984', 'George Orwell', 328),
    new Book('Pride and Prejudice', 'Jane Austen', 279),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 214),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 214),
    new Book('1984', 'George Orwell', 328),
    new Book('1984', 'George Orwell', 328)
  ];

exampleBooks.forEach(book => {
    myLibrary.push(book);
})


viewLibrary(myLibrary);


