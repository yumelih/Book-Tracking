"use strict";

//# 1) Add a Book Logic

const bookShell = document.querySelector(".book-shell_container");
console.log(bookShell);
const addBookContainer = document.querySelector(".add-book_container");

const modal = document.getElementById("my-modal");
const closeModal = document.querySelector(".close");

const modalForm = document.querySelector(".modal-form");
const bookName = modalForm["book-name"];
const bookAuthor = modalForm["book-author"];
const bookImg = modalForm["book-img"];
console.log(bookImg);

let oldBooks = JSON.parse(localStorage.getItem("books") || "[]");

//* Generate a book section html

function saveToLocalStorage(book) {
  let newBooks = [];
  if (oldBooks) {
    newBooks = [...oldBooks, book];
  }
  console.log(newBooks);
  if (oldBooks) {
    localStorage.setItem("books", JSON.stringify(newBooks));
  } else {
    localStorage.setItem("books", JSON.stringify(newBooks));
  }
}

//* Save data to localStorage
modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (bookName && bookAuthor) {
    const book = {
      bookName: bookName.value,
      bookAuthor: bookAuthor.value,
      bookImg: bookImg.value,
    };
    saveToLocalStorage(book);
  }
  location.reload();
});

window.addEventListener("load", function () {
  // Retrieve the relevant localStorage data
  let data = JSON.parse(localStorage.getItem("books"));

  // Check if the data exists
  if (data !== null) {
    // Render the data on the page
    console.log(data);
    data.forEach((book) => {
      let html = `<div class="book_container">
        <img src=${book.bookImg} alt="book cover" />
        <p class="book-name_title">${book.bookName}</p>
        <p class="author-name_title">${book.bookAuthor}</p>
      </div>`;
      bookShell.insertAdjacentHTML("afterbegin", html);
    });
  }
});

//* Modal(open, close)
addBookContainer.onclick = function () {
  modal.style.display = "block";
};
closeModal.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
