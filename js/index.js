const bookList = document.querySelector('ul#list');
const showPanel = document.querySelector('div#show-panel');

let currentUser = {
    "id":1,
    "username":"pouros"
};

getBooks()

function getBooks() {
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookObjsArray => {
        displayBookList(bookObjsArray)
        displayBook(bookObjsArray[0])
    })
};

function displayBookList(bookObjsArray) {
    bookObjsArray.forEach((bookObj) => {
        let bookLi = document.createElement('li')
            bookLi.innerText = bookObj.title
        bookList.append(bookLi)

        bookLi.addEventListener('click', function(e) {
            displayBook(bookObj)
        });

    });

};

function displayBook(bookObj) {
    showPanel.innerText = ""

    let bookImg = document.createElement('img')
        bookImg.src = bookObj.img_url
    
    let bookTitleH1 = document.createElement('h1')
        bookTitleH1.innerText = bookObj.title

    let bookSubtitleH2 = document.createElement('h2')
        bookSubtitleH2.innerText = bookObj.subtitle

    let bookAuthorH3 = document.createElement('h3')
        bookAuthorH3.innerText = bookObj.author

    let bookDescriptionP = document.createElement('p')
        bookDescriptionP.innerText = bookObj.description

    let bookUsersUl = document.createElement('ul')

    bookObj.users.forEach((user) => {
        let bookUsersLi = document.createElement('li')
            bookUsersLi.innerText = user.username
        bookUsersUl.append(bookUsersLi)
    });

    showPanel.append(bookImg, bookTitleH1, bookSubtitleH2, bookAuthorH3, bookDescriptionP, bookUsersUl, createLikeButton(bookObj))
    
};

function createLikeButton(bookObj) {
    let likeButton = document.createElement('button')

    bookObj.users.filter((user) => user.id === currentUser.id).length > 0 ? (likeButton.innerText = 'unlike') : (likeButton.innerText = 'like')

    likeButton.addEventListener('click', function(e) {
        likeButton.innerText === 'like' ? bookObj.users.push(currentUser) : removeUserFromBookObj(bookObj)

        let updatedUsers = {
            users: bookObj.users
        }

        fetch(`http://localhost:3000/books/${bookObj.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUsers)
        })
        .then(response => response.json())
        .then(updatedBookObj => {
            displayBook(bookObj)
        })
    });

    return likeButton
};

function removeUserFromBookObj(bookObj) {
    let index = bookObj.users.findIndex((user) => user === currentUser)
    bookObj.users.splice(index, 1)
};