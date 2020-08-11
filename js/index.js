document.addEventListener('DOMContentLoaded', () => {
  const listPanel = document.querySelector('#list-panel');
  const list = document.querySelector('#list');
  const showPanel = document.querySelector('#show-panel');

  const BASE_URL = 'http://localhost:3000/books';

  fetch(BASE_URL)
    .then((response) => response.json())
    .then((bookArray) => {
      bookArray.forEach((book) => {
        listBook(book);
      });
    });

  const listBook = (book) => {
    const bookLi = document.createElement('li');
    bookLi.innerText = book.title;
    list.append(bookLi);

    bookLi.addEventListener('click', (event) => {
      displayBook(book);
    });
  };

  const displayBook = (book) => {
    showPanel.innerHTML = '';

    const image = document.createElement('img');
    image.src = book.img_url;
    const title = document.createElement('h5');
    title.innerText = book.title;
    const subtitle = document.createElement('h5');
    subtitle.innerText = book.subtitle;
    const author = document.createElement('h5');
    author.innerText = book.author;
    const description = document.createElement('p');
    description.innerText = book.description;
    const userDiv = document.createElement('div');
    const likeButton = document.createElement('button');
    likeButton.innerText = 'Like';

    book.users.forEach((user) => {
      const userLi = document.createElement('li');
      userLi.innerText = user.username;
      userDiv.append(userLi);
    });

    showPanel.append(image, title, subtitle, author, description, userDiv, likeButton);

    const API_PATH = `/${book.id}`;

    likeButton.addEventListener('click', (event) => {
      const users = book.users.push(user);

      const attributePatch = {
        users: users,
      };

      fetch(`${BASE_URL}${API_PATH}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(attributePatch),
      })
        .then((response) => response.json())
        .then((likedBook) => {
          displayBook(likedBook);
        });
    });
  };

});
