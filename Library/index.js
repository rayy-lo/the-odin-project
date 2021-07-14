const harryPotter = new Book("Harry Potter", "J.K.Rowling", 200);
const narnia = new Book("Narnia", "Paul", 100);
const romeoJuliet = new Book("Romeo & Juliet", "William", 50);
let myLibary = [harryPotter, narnia, romeoJuliet];

function addBookToLibrary(library) {
  const cardTemplate = `
        ${library
          .map((book) => {
            return `
                <div class="Card">
                    <span class="title">Title: ${book.title}</span>
                    <span class="title">Author: ${book.author}</span>
                    <span class="title">Pages: ${book.pages}</span>
                </div>
            `;
          })
          .join("")}
    `;

  document.querySelector("#books").innerHTML = cardTemplate;
}

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, not read yet`;
  };
}

function submitBookForm(event) {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;

  const book = new Book(title, author, pages);
  myLibary.push(book);
  addBookToLibrary(myLibary);
}

document.querySelector(".book-form").addEventListener("submit", submitBookForm);

addBookToLibrary(myLibary);
