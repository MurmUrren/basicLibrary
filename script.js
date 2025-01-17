let myLibrary = [];

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

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

Book.prototype.setReadStatus = function(status) {
    this.read = status;
}

function addBookToLibrary(name, author, pages, read) {
    let book = new Book(name, author, pages, read);
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    console.log(`deleting ${myLibrary[index].name}`)
    myLibrary.splice(index, 1);
}

function displayBookOnLibrary(library) {
    libraryDiv.innerHTML = '';
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
            let changeStatus = document.createElement('button');
            changeStatus.textContent = `Mark as In Progress`;
            changeStatus.className = 'status-btn';

            changeStatus.addEventListener("click", () => {
                if (book.read === "in progress") {
                    book.setReadStatus('completed');
                } else if (book.read === 'completed') {
                    book.setReadStatus('not read yet')
                } else {
                    book.setReadStatus('in progress')
                }
                bookStatus.textContent = `Status: ${book.read}`;
                console.log(`Updated book: ${book.name}, Read status: ${book.read}`);
            })

            bookCard.appendChild(bookName);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookPages);
            bookCard.appendChild(bookStatus);
            bookCard.appendChild(changeStatus);

            libraryDiv.appendChild(bookCard);
        }
    });
}

let libraryDiv = document.querySelector('.library-display');

let closePopupBtn = document.getElementById('close');

let addBookBtn = document.getElementById('add-book');

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

let newBookBtn = document.getElementById('new-book');
let newBookPopup = document.querySelector('.new-book-form');
let bookForm = newBookPopup.querySelector('form');

newBookBtn.addEventListener("click", () => {
    newBookPopup.showModal();
    let removeBtns = document.querySelectorAll('#removeBtn');
    removeBtns.forEach(btn => {
        btn.parentNode.removeChild(btn);
    })
})


closePopupBtn.addEventListener("click", (e) => {
    newBookPopup.close();
})

let manageBookBtn = document.getElementById('manage-books-toggle');

manageBookBtn.addEventListener("click", () => {
    let bookCards = document.querySelectorAll('.book-card');   
    bookCards.forEach(book => {
        if (!book.querySelector('button')){
            let removeBookBtn = document.createElement('button');
            removeBookBtn.textContent = "X";
            removeBookBtn.id = "removeBtn";
            removeBookBtn.addEventListener("click", (e) => {
                book.parentNode.removeChild(book);
                removeBookFromLibrary(book.dataset.index);
            })
            book.appendChild(removeBookBtn);
        } else {
            let removeBookBtn = book.querySelector('button');
            book.removeChild(removeBookBtn);
        }
    })
})

displayBookOnLibrary(myLibrary);




