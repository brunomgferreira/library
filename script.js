const add = document.querySelector('.add');
const errorMsg = document.getElementById('errorMsg');
const addBookModal = document.getElementById('addBookModal');

add.addEventListener('click', openAddBookModal);
addBookModal.addEventListener('click', closeModal);

function openAddBookModal(){
    addBookModal.style.display = 'flex';
}

function closeModal(e){
    if(e.target == e.currentTarget){
        e.target.style.display = 'none';
    }
}


var bookCard = document.createElement('div');

var title = document.createElement('div');
title.id = 'title';

var author = document.createElement('div');
author.id = 'author';

var pages = document.createElement('div');
pages.id = 'pages';

var read = document.createElement('button');
read.id = 'read';

var remove = document.createElement('button');
remove.id = 'remove';

class Book {
    constructor(
        title = 'Unkown',
        author = 'Unkown',
        pages = '0',
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrabry(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrabry(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}

const library = new Library();

const form = document.getElementById('addBookForm');

form.addEventListener('submit', addNewBook);

function addNewBook(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    
    const book = new Book(title,author,pages,isRead);

    if (library.isInLibrabry(book)){
        errorMsg.textContent = 'This book already exists in your library';
        errorMsg.style.display = 'block';
    }
    else {
        errorMsg.textContent = '';
        errorMsg.style.display = 'none';
    }

    library.addBook(book);
    console.log(library);
}



