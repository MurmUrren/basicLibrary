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
    let book = new Book(name, author, pages, read);
    myLibrary.push(book);
}

function displayBookOnLibrary(library) {
    library.forEach((book, index) => {
        if (!document.querySelector(`.book-card[data-index="${index}"]`)) {
            let bookCard = document.createElement('div');
            bookCard.setAttribute('data-index', index);

            bookCard.className = 'book-card';

            let bookName = document.createElement('h3');
            bookName.textContent = book.name;
            let bookAuthor = document.createElement('h4');
            bookAuthor.textContent = book.author;
            let bookPages = document.createElement('h5');
            bookPages.textContent = `Pages: ${book.pages}`;
            let bookStatus = document.createElement('p');
            bookStatus.textContent = `Status: ${book.read}`;

            bookCard.appendChild(bookName);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookPages);
            bookCard.appendChild(bookStatus);

            libraryDiv.appendChild(bookCard);
        }
    });
}

let libraryDiv = document.querySelector('.library-display');

let newBookBtn = document.getElementById('new-book');
let newBookPopup = document.querySelector('.new-book-form');
let closePopupBtn = document.getElementById('close');

let addBookBtn = document.getElementById('add-book');

let bookForm = newBookPopup.querySelector('form');

addBookBtn.addEventListener("click", () => {
    const formData = new FormData(bookForm);
    const bookData = {};

    for(let [key, value] of formData.entries()) {
        bookData[key] = value;
    }

    console.log(bookData);

    addBookToLibrary(bookData.title, bookData.author, bookData.pages, bookData.status);
    displayBookOnLibrary(myLibrary);
    
    bookForm.reset();
    newBookPopup.close();
})



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


displayBookOnLibrary(myLibrary);


