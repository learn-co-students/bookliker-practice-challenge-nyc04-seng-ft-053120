document.addEventListener("DOMContentLoaded", function() {});

let bookList = document.querySelector("ul#list")
let bookShow = document.querySelector("div#show-panel")
let bookArr = []

fetch("http://localhost:3000/books")
.then(res => res.json())
.then((bookObjArr) => {
  bookArr = bookObjArr
  renderBookList()
})

let bookListHTML = (bookObj) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = bookObj.title

  bookList.append(bookLi)

  bookLi.addEventListener("click", (evt) => {
    bookHTML(bookObj)
  })
}

let renderBookList = () => {
  bookArr.forEach((book) => {
    bookListHTML(book)
  })
}


let bookHTML = (bookObj) => {
  bookShow.innerHTML = ""
  let bookImg = document.createElement("img")
  bookImg.src = bookObj.img_url

  let bookTitle = document.createElement("h2")
  bookTitle.innerText = bookObj.title

  let bookSubTitle = document.createElement("h2")
  bookSubTitle.innerText = bookObj.subtitle

  let bookAuthor = document.createElement("h2")
  bookAuthor.innerText = bookObj.author

  let bookDes = document.createElement("p")
  bookDes.innerText = bookObj.description

  let userList = document.createElement("ul")

  bookObj.users.forEach((user) => {
    let userLi = document.createElement("li")
    userLi.innerText = user.username

    userList.append(userLi)
  })

  let likeButton = document.createElement("button")
  if ( bookObj.users.find(user => user.id === 1) ) {
    // user with id 1
    likeButton.innerText = "Unlike"
  }
  else {
    likeButton.innerText = "Like"
  }

  bookShow.append(bookImg, bookTitle, bookSubTitle, bookAuthor, bookDes, userList, likeButton)


  likeButton.addEventListener("click", (evt) => {
    // update in memory, database, on page
    if (likeButton.innerText === "Like") {
      likeButton.innerText = "Unlike"

      bookObj.users.push({"id":1, "username":"pouros"})

      fetch(`http://localhost:3000/books/${bookObj.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          users: bookObj.users
        })
      })
      .then(res => res.json())
      .then((updatedBookObj) => {
        bookHTML(updatedBookObj)
      })
    }
    else {
      likeButton.innerText = "Like"

      bookObj.users = bookObj.users.filter((user) => { return user.id !== 1 })

      fetch(`http://localhost:3000/books/${bookObj.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          users: bookObj.users
        })
      })
      .then(res => res.json())
      .then((updatedBookObj) => {
        bookHTML(updatedBookObj)
      })

    }
  })
}

