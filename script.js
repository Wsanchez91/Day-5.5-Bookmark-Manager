const siteName = document.querySelector("#site-name-input");
const siteUrl = document.querySelector("#site-url-input");
const category = document.querySelector("#category-dropdown");
const addBtn = document.querySelector("#add-bookmark");
const allBtn = document.querySelector("#all-btn");
const devBtn = document.querySelector("#dev-btn");
const newsBtn = document.querySelector("#news-btn");
const videoBtn = document.querySelector("#video-btn");
const bookList = document.querySelector("#book-list");

const bookmarkData = JSON.parse(localStorage.getItem("bookmark")) || [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookmark();
});

const addBookmark = () => {
  const nameValue = siteName.value.trim();
  const urlValue = siteUrl.value;
  const categoryValue = category.value;
  const deleteBtn = document.querySelector("#delete-btn");

  const bookmarkObj = {
    name: nameValue,
    url: urlValue,
    category: categoryValue,
  };

//   const updateBookmarkList = () => {
//     bookList.innerHTML = "";

//     bookmarkData.forEach(({ name, url, category }) => {
//       bookList.innerHTML += `
//         <div>
//           <p><strong>Name: </strong>${name}</p>
//           <p><strong>URL: </strong>${url}</p>
//           <p><strong>Category: </strong>${category}</p>
//           <button onclick="deleteBtn()" id="delete-btn">Delete</button>
//           </div>`;
//     });
//   };

  bookList.innerHTML += `
  <div>
    <p><strong>Name: </strong>${bookmarkObj.name}</p>
    <p><strong>URL: </strong>${bookmarkObj.url}</p>
    <p><strong>Category: </strong>${bookmarkObj.category}</p>
    <button onclick="deleteBtn()" id="delete-btn">Delete</button>
    </div>`;


  deleteBtn.addEventListener("click", () => {
    p.remove();
    updateStorage();
  });

  bookmarkData.push(bookmarkObj);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkData));

//   updateBookmarkList();
  console.log(bookmarkObj);
  console.log(bookList);
};
