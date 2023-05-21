"use strict";

//# 1) Add a Book Logic

const bookShell = document.querySelector(".book-shell_container");
const addBookContainer = document.querySelector(".add-book_container");

const modal = document.getElementById("my-modal");
const closeModal = document.querySelector(".close");

const modalForm = document.querySelector(".modal-form");
const bookName = modalForm["book-name"];
const bookAuthor = modalForm["book-author"];
const bookImg = modalForm["book-img"];

const deleteAllBtn = document.querySelector(".nav__delete-btn");

let oldBooks = JSON.parse(localStorage.getItem("books") || "[]");

//* Generate a book section html

function saveToLocalStorage(book) {
  let newBooks = [];
  if (oldBooks) {
    newBooks = [...oldBooks, book];
  }

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

//* Render the page with books from localStorage
window.addEventListener("load", function () {
  // Retrieve the relevant localStorage data
  let data = JSON.parse(localStorage.getItem("books"));

  // Check if the data exists
  if (data !== null) {
    // Render the data on the page
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

//* Delete all the books
deleteAllBtn.addEventListener("click", function (event) {
  if (event.target === deleteAllBtn) {
    if (confirm("Are you sure, this will delete all the books") === true) {
      localStorage.setItem("books", JSON.stringify([]));
      location.reload();
    }
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
