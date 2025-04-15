/* DOM element selectors */
const siteName = document.querySelector("#site-name-input");
const siteUrl = document.querySelector("#site-url-input");
const category = document.querySelector("#category-dropdown");
const addBtn = document.querySelector("#add-bookmark");
const allBtn = document.querySelector("#all-btn");
const devBtn = document.querySelector("#dev-btn");
const newsBtn = document.querySelector("#news-btn");
const videoBtn = document.querySelector("#video-btn");
const bookList = document.querySelector("#book-list");
const error = document.querySelector(".error");

/* Initialize bookmarkData from localStorage or as an empty array */
const bookmarkData = JSON.parse(localStorage.getItem("bookmark")) || [];

/* Function: renderBookmark - Renders a bookmark element in the DOM */
const renderBookmark = (bookmarkObj) => {
  const bookmarkDiv = document.createElement("div");
  bookmarkDiv.setAttribute("data-category", bookmarkObj.category);

  const nameP = document.createElement("p");
  nameP.innerHTML = `<strong>Name: <strong>${bookmarkObj.name}`;

  const urlP = document.createElement("p");
  urlP.innerHTML = `<strong>Url: <strong>${bookmarkObj.url}`;

  const categoryP = document.createElement("p");
  categoryP.innerHTML = `<strong>Category: <strong>${bookmarkObj.category}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    bookmarkDiv.remove();
    const index = bookmarkData.findIndex((b) => b.id === bookmarkObj.id);

    if (index !== -1) {
      bookmarkData.splice(index, 1);
      localStorage.setItem("bookmark", JSON.stringify(bookmarkData));
    }
  });
  bookmarkDiv.appendChild(nameP);
  bookmarkDiv.appendChild(urlP);
  bookmarkDiv.appendChild(categoryP);
  bookmarkDiv.appendChild(deleteBtn);

  bookList.appendChild(bookmarkDiv);
};

/* Function: addBookmark - Adds a new bookmark and updates storage */
const addBookmark = () => {
  const nameValue = siteName.value.trim();
  let urlValue = siteUrl.value;

  if (!urlValue.startsWith("http")) {
    error.textContent = "Please enter a valid url link";
    return;
  } else {
    error.textContent = "";
  }
  const categoryValue = category.value;

  const bookmarkObj = {
    id: Date.now(),
    name: nameValue,
    url: urlValue,
    category: categoryValue,
  };

  bookmarkData.push(bookmarkObj);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkData));

  renderBookmark(bookmarkObj);

  console.log(bookmarkObj);
  console.log(bookmarkData);
};

/* Function: loadBookmarks - Loads bookmarks from storage and renders them */
const loadBookmarks = () => {
  bookmarkData.forEach((bookmark) => renderBookmark(bookmark));
};

/* Event Listener: addBtn - Handles adding a new bookmark */
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookmark();
  siteName.value = "";
  siteUrl.value = "";
});

/* Event Listener: allBtn - Displays all bookmarks */
allBtn.addEventListener("click", () => {
  document
    .querySelectorAll("#book-list > div")
    .forEach((bookmarkDiv) => (bookmarkDiv.style.display = "flex"));
});
/* Event Listener: devBtn - Filters bookmarks to show only 'Dev' category */
devBtn.addEventListener("click", () => {
  document.querySelectorAll("#book-list > div").forEach((bookmarkDiv) => {
    const category = bookmarkDiv.getAttribute("data-category");
    bookmarkDiv.style.display =
      category.toLowerCase() === "dev" ? "flex" : "none";
  });
});
/* Event Listener: newsBtn - Filters bookmarks to show only 'News' category */
newsBtn.addEventListener("click", () => {
  document.querySelectorAll("#book-list > div").forEach((bookmarkDiv) => {
    const category = bookmarkDiv.getAttribute("data-category");
    bookmarkDiv.style.display =
      category.toLowerCase() === "news" ? "flex" : "none";
  });
});
/* Event Listener: videoBtn - Filters bookmarks to show only 'Video' category */
videoBtn.addEventListener("click", () => {
  document.querySelectorAll("#book-list > div").forEach((bookmarkDiv) => {
    const category = bookmarkDiv.getAttribute("data-category");
    bookmarkDiv.style.display =
      category.toLowerCase() === "video" ? "flex" : "none";
  });
});

/* Event Listener: DOMContentLoaded - Loads bookmarks when the page finishes loading */
window.addEventListener("DOMContentLoaded", loadBookmarks);
