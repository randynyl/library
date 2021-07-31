let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    read = false;
    this.info = function() {
        let bookDetails = `${title} by ${author}, ${pages} pages, `;
        let readDetails;
        if (read) {
            readDetails = 'already read';
        } else {
            readDetails = 'not read yet';
        }
        return bookDetails + readDetails;
    }
}

function addBookToLibrary() {
    let book1 = new Book("title 1", "author 1", 362);
    let book2 = new Book("title 2", "author 2", 363);
    myLibrary.push(book1);
    myLibrary.push(book2);
}

function displayBooks(bookArr) {
    const bookContainer = document.getElementById('book-container');

    bookArr.forEach(book => {
        let bookCard = document.createElement('div');
        let titleText = document.createElement('div');
        let authorText = document.createElement('div');
        let pageNum = document.createElement('div');

        titleText.classList.add('book-card-text');
        authorText.classList.add('book-card-text');
        pageNum.classList.add('book-card-text');

        console.log(book.title);
        titleText.innerHTML = book.title;
        authorText.innerHTML = book.author;
        pageNum.innerHTML = book.pages + ' pages';

        bookCard.appendChild(titleText);
        bookCard.appendChild(authorText);
        bookCard.appendChild(pageNum);
        bookCard.classList.add('book-card');

        bookContainer.appendChild(bookCard);
    })
    // display 'Add book' card
    let addBookCard = document.createElement('div');
    let addBtn = document.createElement('button');

    addBtn.innerHTML = 'ADD BOOK';
    addBtn.classList.add('add-btn');
    addBookCard.appendChild(addBtn);
    addBookCard.classList.add('book-card');
    bookContainer.appendChild(addBookCard);
    addBtn.addEventListener('click', () => {
        const form = document.querySelector('#add-book-form');
        openForm(form);
    })

}

function openForm(form) {
    if (form == null) return;

    const overlay = document.getElementById('overlay');
    const closeFormBtns = document.querySelectorAll('[data-close-button]');

    form.classList.add('active');
    overlay.classList.add('active');
    
    closeFormBtns.forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('.form');
            closeForm(form);
        })
    })
    overlay.addEventListener('click', () => {
        const form = document.querySelector('.form.active')
        closeForm(form);
    })
}


function closeForm(form) {
    if (form == null) return;
    form.classList.remove('active');
    overlay.classList.remove('active');
}
addBookToLibrary();
displayBooks(myLibrary);