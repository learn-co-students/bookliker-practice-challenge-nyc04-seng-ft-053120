//STABLE ELEMENTS
const bookListUl = document.querySelector("#list-panel")
const bookShowPanelDiv = document.querySelector("#show-panel")
const userOne = {"id":1, "username":"pouros"}
fetch("http://localhost:3000/books")
.then((response) => response.json())
.then((booksArray) => {
    booksArray.forEach(bookObject => {
        convertToHTML(bookObject)
    });
})
let convertToHTML = (singleBook) => {
    const bookLi = document.createElement("li")
    bookLi.innerText = singleBook.title
    bookListUl.append(bookLi)
    bookLi.addEventListener("click", (event) => {
        bookObjectToHTML(singleBook)
    })
}
let bookObjectToHTML = (singleBook) => {
    bookShowPanelDiv.innerText = ""
    const bookImg = document.createElement("img")
    bookImg.src = singleBook.img_url
    const bookH1 = document.createElement("h1")
    bookH1.innerText = singleBook.title
    const bookH2 = document.createElement("h2")
    bookH2.innerText = singleBook.subtitle
    const bookH3 = document.createElement("h3")
    bookH3.innerText = singleBook.author
    const bookP = document.createElement("p")
    bookP.innerText = singleBook.description 
    const userUl = document.createElement("ul")
    singleBook.users.forEach(user => {
        const userLi = document.createElement("li")
        userLi.innerText = user.username
        userUl.append(userLi)
    });
    const bookButton = document.createElement('button')
   
    // access the current books review array and check for the the user of id 1
    // if they are return true
    // else return false
    let  bookUsers = singleBook.users
     
    !!bookUsers.find(userObj => userObj.id === 1) ? (bookButton.innerText = "UNLIKE") : (bookButton.innerText = "LIKE")
    

    bookShowPanelDiv.append(bookImg, bookH1, bookH2, bookH3, bookP, userUl, bookButton)
    //EVENT LISTENER FOR LIKE BUTTON
    bookButton.addEventListener("click", (event) => {
        if(bookButton.innerText === "UNLIKE"){
            bookButton.innerText = "LIKE"
             singleBook.users.pop()
            fetch(`http://localhost:3000/books/${singleBook.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(singleBook) //book that we had originally is pasted over with the one we just made
            })
            .then((response) => response.json())
            .then((bookObj) => {
                bookObjectToHTML(bookObj)
            })
        }else{
            bookButton.innerText = "UNLIKE"
            //single book is an object, we get access to singleBooks array, through users
            //singleBook.users gives us access to users array
            //pushing in our user instance to that array every time we hit the like button
            //then we patch method (in body) we are sending singleBook with this updated value: 
            singleBook.users.push(userOne)
            fetch(`http://localhost:3000/books/${singleBook.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(singleBook) //book that we had originally is pasted over with the one we just made
            })
            .then((response) => response.json())
            .then((bookObj) => {
                bookObjectToHTML(bookObj)
            })
        }
    })
}
//to remove the last object of an array: .pop 
//so for the bonus, instead .push we would have .pop.. cool cool



 
  