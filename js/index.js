const bookListUl = document.querySelector("#list"),
      showPanelDiv = document.querySelector("#show-panel");

function getBooks() {
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(books => {
      books.forEach(book => bookListUl.append(createBookLi(book)));

      displayOnShowPanel(books[0]);
    });

}

// Takes a book object and returns the Li of the book
function createBookLi(book) {
  const bookLi = document.createElement("li");
  bookLi.innerText = book.title;
  
  bookLi.addEventListener("click", (evt) => {
    displayOnShowPanel(book)
  })
  
  return bookLi;

  
}

// Takes a book object and display its info on the showPanelDiv
function displayOnShowPanel(book) {
  showPanelDiv.innerText = '';

  const bookImg = document.createElement("img");
  bookImg.src = book["img_url"];

  const lineBreak = document.createElement("br");

  const bookTitle = document.createElement("h4");
  bookTitle.innerText = book.title;

  const bookSubtitle = document.createElement("h4");
  bookSubtitle.innerText = book.subtitle

  const bookDescription = document.createElement("p");
  bookDescription.innerText = book.description

  const likeBtn = document.createElement("button");
  likeBtn.innerText = "Like";

  showPanelDiv.append(bookImg, lineBreak, bookTitle, bookSubtitle, bookDescription, createLikersUl(book), likeBtn)

  likeBtn.addEventListener("click", (evt) => {
    if (evt.target.innerText === "Like") {
      evt.target.innerText = "Dislike";
      addLikerToLikersUl(evt, book);
    } else {
      evt.target.innerText = "Like";
      removeLikerFromLikersUl(evt, book);
    }
  })
  
}

function createLikersUl(book) {
  const likersUl = document.createElement("ul");

  book.users.forEach(user => {
    likersUl.append(createLikerLi(user));
  })

  return likersUl;
}

function createLikerLi(user) {
  const likerLi = document.createElement("li");
  likerLi.innerText = user["username"];
  return likerLi;
}

function addLikerToLikersUl(evt, book) {
  const bookNewLiker = {
    id: 1,
    username: "pouros"
  };

  book.users.push(bookNewLiker);
  newBookLikers = { users: book.users }; 

  fetch('http://localhost:3000/books/' + book.id, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(newBookLikers)
  })
    .then(response => response.json())
    .then(editedBook => {
      const newLiker = book.users[book.users.length - 1];
      evt.target.previousSibling.append(createLikerLi(newLiker));
    });
}

function removeLikerFromLikersUl(evt, book) {
  book.users.pop();
  newBookLikers = { users: book.users };

  fetch('http://localhost:3000/books/' + book.id, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(newBookLikers)
  })
    .then(response => response.json())
    .then(editedBook => {
      evt.target.previousElementSibling.lastElementChild.remove();
    });
}

getBooks();