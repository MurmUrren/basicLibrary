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
            
            let bookInfo = document.createElement('div');
            let bookCard = document.createElement('div');
            bookCard.setAttribute('data-index', index);

            bookCard.className = 'book-card';
            bookInfo.className = 'book-info';

            let bookName = document.createElement('h3');
            bookName.textContent = book.name;
            let bookAuthor = document.createElement('p');
            bookAuthor.textContent = book.author;
            let bookPages = document.createElement('p');
            bookPages.textContent = `Pages: ${book.pages}`;
            let bookStatus = document.createElement('p');
            bookStatus.textContent = `Status: ${book.read}`;
            let changeStatus = document.createElement('button');
            changeStatus.textContent = `Mark as In Progress`;
            changeStatus.id = 'status-btn';

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

            bookInfo.appendChild(bookName);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(bookPages);
            bookInfo.appendChild(bookStatus);
            bookCard.appendChild(bookInfo)
            bookCard.appendChild(changeStatus);

            libraryDiv.appendChild(bookCard);
        }
    });
}

let libraryDiv = document.querySelector('.library-display');

let closePopupBtn = document.getElementById('close');

let addBookBtn = document.getElementById('add-book');

addBookBtn.addEventListener("click", () => {
    bookForm.classList.add('submitted');
    if (!bookForm.checkValidity()) {
        bookForm.reportValidity();
        return;
    } 
    const formData = new FormData(bookForm);
    const bookData = {};

    for(let [key, value] of formData.entries()) {
        bookData[key] = value;
    }

    console.log(bookData);

    addBookToLibrary(bookData.title, bookData.author, bookData.pages, bookData.status);
    displayBookOnLibrary(myLibrary);
    
    bookForm.reset();
    newBookPopup.style.display = 'none';
    bookForm.classList.remove('submitted');
    newBookPopup.close();
})

let newBookBtn = document.getElementById('new-book');
let newBookPopup = document.querySelector('.new-book-form');
let bookForm = newBookPopup.querySelector('form');

newBookBtn.addEventListener("click", () => {
    newBookPopup.style.display = 'flex';
    newBookPopup.showModal();
    let removeBtns = document.querySelectorAll('#removeBtn');
    removeBtns.forEach(btn => {
        btn.parentNode.removeChild(btn);
    })
})


closePopupBtn.addEventListener("click", (e) => {
    newBookPopup.style.display = 'none';
    bookForm.classList.remove('submitted');
    newBookPopup.close();
    bookForm.reset();
})

closePopupBtn.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        newBookPopup.style.display = 'none';
        bookForm.classList.remove('submitted');
        newBookPopup.close();
        bookForm.reset();
    }
})

let manageBookBtn = document.getElementById('manage-books-toggle');

manageBookBtn.addEventListener("click", () => {
    let bookCards = document.querySelectorAll('.book-card');   
    bookCards.forEach(book => {
        if (!book.querySelector('#removeBtn')){
            let removeBookBtn = document.createElement('button');
            removeBookBtn.textContent = "X";
            removeBookBtn.id = "removeBtn";
            removeBookBtn.addEventListener("click", (e) => {
                book.parentNode.removeChild(book);
                removeBookFromLibrary(book.dataset.index);
            })
            book.appendChild(removeBookBtn);
        } else {
            let removeBookBtn = book.querySelector('#removeBtn');
            book.removeChild(removeBookBtn);
        }
    })
})

displayBookOnLibrary(myLibrary);




