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

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookmark();
  siteName.value = "";
  siteUrl.value = "";
});

const bookmarkData = JSON.parse(localStorage.getItem("bookmark")) || [];

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

  const bookmarkDiv = document.createElement("div");

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

  console.log(bookmarkObj);
  console.log(bookmarkData);
};

