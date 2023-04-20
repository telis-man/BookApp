let title = document.querySelector("#title");
let author = document.querySelector("#author");
let genre = document.querySelector("#genre");
let urlImage = document.querySelector("#urlImage");
let price = document.querySelector("#price");
let date = document.querySelector("#date");
let submitButton = document.querySelector("#submitButton");

function deleteTask(title) {
  let books = JSON.parse(localStorage.getItem("books"));

  for (let book of books) {
    if (book.title === title) {
      books.splice(books.indexOf(book), 1);
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      console.log("Nerasta tarp local st");
    }
  }
}

function addBook(title, author, genre, urlImage, price, date) {
  if (!localStorage.getItem("books")) {
    let books = [];
    localStorage.setItem("books", JSON.stringify(books));
  }

  let books = JSON.parse(localStorage.getItem("books"));

  let bookObj = {
    title: title,
    author: author,
    genre: genre,
    urlImage: urlImage,
    price: price,
    date: date,
  };

  books.push(bookObj);
  localStorage.setItem("books", JSON.stringify(books));
}

function findBook(title) {
  let books = JSON.parse(localStorage.getItem("books"));

  for (let book of books) {
    if (book.title === title) return book;
  }
}
function replaceBook(oldTitle, bookObj) {
  let books = JSON.parse(localStorage.getItem("books"));

  for (let book of books) {
    if (book.title === oldTitle) {
      book.title = bookObj.title;
      book.author = bookObj.author;
      book.urlImage = bookObj.urlImage;
      book.genre = bookObj.genre;
      book.price = bookObj.price;
      book.date = bookObj.date;
      console.log(book);

      localStorage.setItem("books", JSON.stringify(books));
    } else {
      console.log("Nerasta tarp local st");
    }
  }
}

function generateBookItem(title, author, imageUrl, genre, price, date) {
  let cardItem = document.createElement("div");
  let titleItem = document.createElement("h2");
  let imageItem = document.createElement("img");
  let authorItem = document.createElement("h3");
  let priceItem = document.createElement("p");
  let dateItem = document.createElement("p");
  let genreItem = document.createElement("p");
  let editBookButton = document.createElement("button");
  editBookButton.textContent = "Edit book";
  let deleteBookButton = document.createElement("button");
  deleteBookButton.textContent = "Delete book";
  deleteBookButton.setAttribute("id", "deleteButton");

  let inputTitle = document.querySelector("#title");
  let inputAuthor = document.querySelector("#author");
  let inputDate = document.querySelector("#date");
  let inputPrice = document.querySelector("#price");
  let inputUrlImage = document.querySelector("#urlImage");
  let inputGenre = document.querySelector("#genre");

  let oldTitle = title;
  titleItem.textContent = title;
  authorItem.textContent = author;
  imageItem.src = imageUrl;
  genreItem.textContent = genre;
  dateItem.textContent = date;
  priceItem.textContent = price + "€";

  editBookButton.addEventListener("click", () => {
    let book = findBook(titleItem.textContent);

    inputTitle.value = book.title;
    inputAuthor.value = book.author;
    inputDate.value = book.date;
    inputPrice.value = book.price;
    inputUrlImage.value = book.urlImage;
    inputGenre.value = book.genre;

    editBookButton.disabled = "true";

    document.querySelector("#submitButton").remove();

    let submitChangesButton = document.createElement("button");
    submitChangesButton.textContent = "Submit changes";
    submitChangesButton.setAttribute("type", "button");
    document.querySelector("#inputForm").append(submitChangesButton);
    window.scrollTo(0, 0);

    submitChangesButton.addEventListener("click", () => {
      book.title = inputTitle.value;
      book.author = inputAuthor.value;
      book.urlImage = inputUrlImage.value;
      book.genre = inputGenre.value;
      book.price = inputPrice.value;
      book.date = inputDate.value;

      replaceBook(oldTitle, book);
      location.reload();
    });
  });

  deleteBookButton.addEventListener("click", () => {
    deleteTask(oldTitle);
    location.reload();
  });

  cardItem.append(
    imageItem,
    titleItem,
    authorItem,
    genreItem,
    dateItem,
    priceItem,
    editBookButton,
    deleteBookButton
  );

  document.querySelector(".container").append(cardItem);
}

submitButton.addEventListener("click", () => {
  addBook(
    title.value,
    author.value,
    genre.value,
    urlImage.value,
    price.value,
    date.value
  );

  generateBookItem(
    title.value,
    author.value,
    urlImage.value,
    genre.value,
    price.value,
    date.value
  );

  title.value = "";
  author.value = "";
  genre.value = "";
  urlImage.value = "";
  price.value = 0;
  date.value = 0;
});

window.addEventListener("load", () => {
  let books = JSON.parse(localStorage.getItem("books"));

  for (let book of books) {
    generateBookItem(
      book.title,
      book.author,
      book.urlImage,
      book.genre,
      book.price,
      book.date
    );
  }
});
