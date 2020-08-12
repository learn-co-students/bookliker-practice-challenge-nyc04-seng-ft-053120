document.addEventListener("DOMContentLoaded", function() {});

console.log('hello')

fetch(`http://localhost:3000/books`)
.then (res => res.json())
.then (booksArr => booksArr.forEach((book) => {
    renderBooks(book)
}))

let bookList = document.querySelector('#list')
let showBook = document.querySelector('#show-panel')

let renderBooks = (bookObj) => {

    let newLi = document.createElement('li')
        newLi.innerText = bookObj.title
    
        bookList.append(newLi)

    let newImg = document.createElement('img')
        newImg.src = bookObj.img_url
    
    let newPar = document.createElement('p')
        newPar.innerText = bookObj.description

    let newButton = document.createElement('button')
        newButton.innerText = "like"

        

    

    newButton.addEventListener('click', (evt) => {
        fetch(`http://localhost:3000/books/${bookObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              users: [{id:1, username:"pouros"}] 
            })
        })
        .then(res => res.json())
        .then(like => renderLikes(like)
            )
        //Was not able to figure out the like feature in order to add nested upodated
    })

    newLi.addEventListener('click', (evt) => {
        console.log(evt.target.innerText)
        showBook.innerHTML = ""
        showBook.append(newImg, newPar)
    
       
            bookObj.users.forEach((user) => {
                    renderLikes(user)
        })   
 

        
    })

    function renderLikes(u) {
        let likesUl = document.createElement('ul')
        let likesLi = document.createElement('li')
        let space = document.createElement('br')
            likesLi.innerText = u.username

        
        likesUl.append(likesLi,space, newButton)
        showBook.append(likesUl)


        
    }

        
  
}