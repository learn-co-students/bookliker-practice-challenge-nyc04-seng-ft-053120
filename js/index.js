
const userMe = {
  id: 1,
  username: 'pouros'
}

const bookListUl = document.querySelector("#list")

const bookShowPanel = document.querySelector("#show-panel")
const bookImage = document.createElement("img")
bookImage.id = "book-image"
const bookTitleH2 = document.createElement("h2")
bookTitleH2.id = "book-title"
const bookAuthorH2 = document.createElement("h2")
bookAuthorH2.id = "book-author"
const bookSubTitleH3 = document.createElement("h3")
bookSubTitleH3.id = "book-subtitle"
const bookDescription = document.createElement("p")
bookDescription.id = "book-description"
const bookUsersUl = document.createElement("ul")
bookUsersUl.id = "book-users-list"
const likeButton = document.createElement("button")

bookShowPanel.append(bookImage, bookTitleH2, bookAuthorH2, bookSubTitleH3, bookDescription, bookUsersUl, likeButton)

fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(bookArray => {
    console.log(bookArray)
    bookArray.forEach(book => {
      renderBook(book)
    });
  })

const renderBook = (book) => {

  const bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookLi.addEventListener("click", (evt) => {
    console.log(book)
    bookImage.src = book.img_url
    bookTitleH2.innerText = book.title
    bookAuthorH2.innerText = book.author
    bookSubTitleH3.innerText = book.subtitle
    bookDescription.innerText = book.description

    likeButton.innerText = "LIKE"
    likeButton.addEventListener("click", (likeEvt) => {
      toggleLikeBook(book)
    })

    bookUsersUl.innerHTML = ""

    book.users.forEach((user) => {
      const userLi = document.createElement("li")
      userLi.id = user.username
      userLi.innerText = user.username
      bookUsersUl.append(userLi)
      if (user.id === userMe.id) { likeButton.innerText = "UNLIKE" }
    })

  })

  bookListUl.append(bookLi)
}

const toggleLikeBook = (book) => {

  const likeFlag = iLikeBook(book)

  let updatedBook

  if (likeFlag) {
    updatedBook = unlikeBook(book)
  }
  else {
    updatedBook = likeBook(book)
  }
}

const iLikeBook = (book) => {
  let likeFlag = false
  book.users.forEach((user) => {
    if (user.id === userMe.id) { likeFlag = true }
  })
  return likeFlag
}

const unlikeBook = (book) => {
  book.users.forEach((user, index, object) => {
    if (user.id === userMe.id) {
      object.splice(index, 1)
      likeButton.innerText = "LIKE"
      const userMeLi = document.getElementById(userMe.username)
      userMeLi.remove()
    }
  })
  patchBook(book)
}

const likeBook = (book) => {
  const userLi = document.createElement("li")
  userLi.id = userMe.username
  userLi.innerText = userMe.username
  bookUsersUl.append(userLi)
  likeButton.innerText = "UNLIKE"
  book.users.push(userMe)
  patchBook(book)
}

const patchBook = (book) => {

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ users: book.users })
  }

  fetch(`http://localhost:3000/books/${book.id}`, options)
    .then(res => res.json())
    .then(updatedBook => {
    })
}
