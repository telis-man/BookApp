export function findBook(title) {
  let books = JSON.parse(localStorage.getItem("books"));

  for (let book of books) {
    if (book.title === title) return book;
  }
}

export function filterBySearch(input, books) {
  let filteredArr = books.filter((obj) => {
    // Object.values(obj).some((val) => val.includes(input));
    for (let value of Object.values(obj)) {
      if (value.toLowerCase().includes(input.toLowerCase())) return true;
    }
  });
  console.log(filteredArr);
  return filteredArr;
  // let positive_array = books.filter(function(value) {
  //   return value.includes; });
}

export function deleteTask(title) {
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

export function addBook(title, author, genre, urlImage, price, date) {
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

export function replaceBook(oldTitle, bookObj) {
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
