let myLibrary;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = isRead;
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

        console.log(book.read);
        if (book.read == true) {
            readBtn.innerHTML = 'READ';
            readBtn.classList.add('read-button');
        }

        bookContainer.appendChild(bookCard);
    })
    // display 'Add book' card after all existing book cards
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
    console.log(myLibrary);
    console.log(index);
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

function resetForm(form) {
    form.elements['title-input'].value = '';
    form.elements['author-input'].value = '';
    form.elements['page-input'].value = '';
    form.elements['read-checkbox'].checked = false;
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function main() {

    if (storageAvailable('localStorage')) {
        if(!localStorage.getItem('stored-books')) {
            myLibrary = [];
          } else {
            myLibrary = JSON.parse(localStorage.getItem('stored-books'));
            for (let i=0; i<myLibrary.length; i++) {
                myLibrary[i] = new Book(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read);
            }
          }
      }
      else {
        myLibrary = [];
      } 

    displayBooks(myLibrary);
    confirmBtn = document.getElementById('add-confirm-button');
    confirmBtn.classList.add('add-remove-confirm-button');
    confirmBtn.addEventListener('click', () => {

        const form = document.getElementById('submit-form');
        let newBookTitle = form.elements['title-input'].value;
        let newBookAuthor = form.elements['author-input'].value;
        let newBookPages = form.elements['page-input'].value;
        let newBookIsRead = form.elements['read-checkbox'].checked;

        let addedBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookIsRead);
        myLibrary.push(addedBook);
        closeForm(document.querySelector('#add-book-form'));
        displayBooks(myLibrary);
        localStorage.setItem('stored-books', JSON.stringify(myLibrary));
        resetForm(form);
    })
}

main();


