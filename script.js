let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
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
    this.toggleRead = function() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    }


}


function displayBooks(bookArr) {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = '';

    bookArr.forEach((book, index) => {
        let bookCard = document.createElement('div');
        let titleText = document.createElement('div');
        let authorText = document.createElement('div');
        let pageNum = document.createElement('div');
        let readBtn = document.createElement('button');
        let removeBtn = document.createElement('button');
        bookCard.setAttribute('data-index', index);

        titleText.classList.add('book-card-text', 'book-title');
        authorText.classList.add('book-card-text');
        pageNum.classList.add('book-card-text');
        readBtn.classList.add('unread-button');
        removeBtn.classList.add('add-remove-confirm-button');

        readBtn.addEventListener('click', () => {
            toggleReadButton(readBtn);
        })

        removeBtn.addEventListener('click', () => {
            let index = removeBtn.parentNode.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks(bookArr);
        })

        console.log(book.title);
        titleText.innerHTML = book.title;
        authorText.innerHTML = book.author;
        pageNum.innerHTML = book.pages + ' pages';
        readBtn.innerHTML = 'UNREAD';
        removeBtn.innerHTML = 'REMOVE BOOK';

        bookCard.appendChild(titleText);
        bookCard.appendChild(authorText);
        bookCard.appendChild(pageNum);
        bookCard.appendChild(readBtn);
        bookCard.appendChild(removeBtn);
        bookCard.classList.add('book-card');

        if (book.read == true) {
            toggleReadButton(readBtn);
        }

        bookContainer.appendChild(bookCard);
    })
    // display 'Add book' card
    let addBookCard = document.createElement('div');
    let addBtn = document.createElement('button');

    addBtn.innerHTML = 'ADD BOOK';
    addBtn.classList.add('add-remove-confirm-button');
    addBookCard.appendChild(addBtn);
    addBookCard.classList.add('book-card');
    bookContainer.appendChild(addBookCard);
    addBtn.addEventListener('click', () => {
        const form = document.querySelector('#add-book-form');
        openForm(form);
    })

}

function toggleReadButton(readBtn) {
    let index = readBtn.parentNode.getAttribute('data-index');
    myLibrary[index].toggleRead();
    if (readBtn.classList.contains('read-button')) {
        readBtn.innerHTML = 'UNREAD';
    } else {
        readBtn.innerHTML = 'READ';
    }
    readBtn.classList.toggle('read-button');
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

function main() {
    displayBooks(myLibrary);
    confirmBtn = document.getElementById('add-confirm-button');
    confirmBtn.classList.add('add-remove-confirm-button');
    confirmBtn.addEventListener('click', () => {
        // let newBookTitle = document.getElementById('title-input').value;
        // let newBookAuthor = document.getElementById('author-input').value;
        // let newBookPages = document.getElementById('page-input').value;

        // console.log(newBookTitle);
        // console.log(newBookAuthor);
        // console.log(newBookPages);

        // let addedBook = new Book(newBookTitle, newBookAuthor, newBookPages);
        // myLibrary.push(addedBook);
        // displayBooks(myLibrary);

        const form = document.getElementById('submit-form');
        let newBookTitle = form.elements['title-input'].value;
        let newBookAuthor = form.elements['author-input'].value;
        let newBookPages = form.elements['page-input'].value;
        let newBookIsRead = form.elements['read-checkbox'].checked;

        let addedBook = new Book(newBookTitle, newBookAuthor, newBookPages);
        if (newBookIsRead) {
            addedBook.toggleRead();
        }
        myLibrary.push(addedBook);
        closeForm(document.querySelector('#add-book-form'));
        displayBooks(myLibrary);
    })
}

main();
