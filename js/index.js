const booksListUl = document.querySelector("#list-panel")
const bookShowPanel = document.querySelector("#show-panel")

fetch("http://localhost:3000/books")
.then((resp) => resp.json())
.then((booksArr) => {
    booksArr.forEach((bookObj) => {
        convertToHTML(bookObj)
  })
}); 
// CONVERT TITLE TO HTML FOR THE BOOKS LIST
const convertToHTML = (singleBook) => {
    const bookLi = document.createElement("li")
        bookLi.innerText = singleBook.title
    booksListUl.append(bookLi)

// EVENT LISTENER TO SHOW BOOK DETAILS
bookLi.addEventListener("click", (evt) => {
    bookShowPanel.innerText = ""
    bookObjToHTML(singleBook)
})
}

const bookObjToHTML = (singleBook) => {
    const bookImg = document.createElement("img")
        bookImg.src = singleBook.img_url
    const bookH1 = document.createElement("h1")
        bookH1.innerText = singleBook.title
    const bookH2 = document.createElement("h2")
        bookH1.innerText = singleBook.subtitle
    const bookH3 = document.createElement("h3")
        bookH3.innerText = singleBook.author
    const bookP = document.createElement("p")
        bookP.innerText = singleBook.description
    const userUl = document.createElement("ul")

    singleBook.users.forEach((user) => {
        const userLi = document.createElement("li")
            userLi.innerText = user.username
            userUl.append(userLi)
    })
    // CREATE LIKE BUTTON
    const bookButton = document.createElement("button")
        bookButton.innerText = "LIKE"

    bookShowPanel.append(bookImg, bookH1, bookH2, bookH3, bookP, userUl, bookButton)

    // EVENT LISTENER FOR LIKE BUTTON
    bookButton.addEventListener("click", (evt) => {
       if(bookButton.innerText === "UNLIKE"){
           bookButton.innerText = "LIKE"
       }else{
           bookButton.innerText = "UNLIKE"
       }
        // PATCH REQUEST
        // USERS ARE NESTED 
        singleBook.users.push({"id":1, "username":"pouros" })
        fetch(`http://localhost:3000/books/${singleBook.id} `, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(singleBook) // body gives us our params
        })
            .then(resp => resp.json())
            .then(updatedBook => {
                bookObjToHTML(updatedBook)
            })
    })
}

//