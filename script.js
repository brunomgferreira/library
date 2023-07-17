const add = document.querySelector('.add');
const errorMsg = document.getElementById('errorMsg');
const addBookModal = document.getElementById('addBookModal');
const grid = document.querySelector('.grid');
const submit = document.getElementById('submit');

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
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var isRead = document.getElementById('isRead').checked;
    
    var book = new Book(title,author,pages,isRead);

    if (library.isInLibrabry(book)){
        errorMsg.textContent = 'This book already exists in your library';
        errorMsg.style.display = 'block';
    }
    else {
        form.reset()
        errorMsg.textContent = '';
        errorMsg.style.display = 'none';
        library.addBook(book);
        displayBooks();
    }
}

function displayBook(book, index){
    var bookCard = document.createElement('div');
    bookCard.classList = 'book-card';
    bookCard.id = 'book-card-' + index;

    var title = document.createElement('div');

    var author = document.createElement('div');

    var pages = document.createElement('div');

    var read = document.createElement('button');

    var remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.classList = 'btn';

    title.textContent = '"' + book.title + '"';
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";
    if (book.isRead == true) {
        read.textContent = "Read";
        read.classList = 'btn btn-light-green';
    }
    else {
        read.textContent = "Not Read";
        read.classList = 'btn btn-light-red';
    }
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);
    remove.addEventListener('click', removeBookCard);
    grid.appendChild(bookCard);
}


function displayBooks(){
    grid.innerHTML = '';
    index = 0;
    library.books.forEach(function(book) {
        displayBook(book, index);
        index++;
    })
}

function removeBookCard(e){
    var title = library.books[e.target.parentNode.id[e.target.parentNode.id.length -1]].title;
    library.removeBook(title);
    displayBooks();
}
