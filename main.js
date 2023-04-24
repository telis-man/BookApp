let title = document.querySelector("#title");
let author = document.querySelector("#author");
let genre = document.querySelector("#genre");
let urlImage = document.querySelector("#urlImage");
let price = document.querySelector("#price");
let date = document.querySelector("#date");
let submitButton = document.querySelector("#submitButton");
import { filterBySearch } from "./localStorageServices";
import { deleteTask } from "./localStorageServices";
import { addBook } from "./localStorageServices";
import { findBook } from "./localStorageServices";
import { replaceBook } from "./localStorageServices";

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
  editBookButton.setAttribute("id", "editBookButton");
  let deleteBookButton = document.createElement("button");
  deleteBookButton.textContent = "Delete book";

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
    if (document.querySelector("#inputForm").classList.contains) {
      document.querySelector("#inputForm").classList.toggle("dnone");
    }

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
  if (findBook(title.value)) {
    alert("Book exists!");
  } else {
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
  }
});

function clearContainerItems() {
  const container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

window.addEventListener("load", () => {
  let filterSelectItem = document.querySelector(".searchMeniu");
  let books = JSON.parse(localStorage.getItem("books"));

  document.querySelector("#formToggle").addEventListener("click", () => {
    document.querySelector("#inputForm").classList.toggle("dnone");
  });

  filterSelectItem.addEventListener("change", (event) => {
    if (event.target.value == "Title") {
      books.sort(function (a, b) {
        let textA = a.title.toUpperCase();
        let textB = b.title.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      clearContainerItems();
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
    }

    if (event.target.value == "Author") {
      books.sort(function (a, b) {
        let textA = a.author.toUpperCase();
        let textB = b.author.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      clearContainerItems();
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
    }

    if (event.target.value == "Genre") {
      books.sort(function (a, b) {
        let textA = a.genre.toUpperCase();
        let textB = b.genre.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      clearContainerItems();
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
    }
    if (event.target.value == "Date") {
      books.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

      clearContainerItems();
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
    }
    if (event.target.value == "Price") {
      books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

      clearContainerItems();
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
    }
  });

  document.querySelector("#mainSearch").addEventListener("input", (event) => {
    clearContainerItems();

    let filteredObj = filterBySearch(
      event.target.value,
      JSON.parse(localStorage.getItem("books"))
    );

    console.log(filteredObj);

    for (let book of filteredObj) {
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

  if (!localStorage.getItem("books")) {
    let books = [];
    localStorage.setItem("books", JSON.stringify(books));
  } else {
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
  }
});
