const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  items.push(item);
  console.log(items);

  //clear input
  e.target.reset();
  //custom event
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayItems() {
  const html = items
    .map((item) => {
      return `<li class="shopping-item">
      <input value="${item.id}" type="checkbox" ${
        item.complete ? "checked" : null
      }>
      <span class="itemName">${item.name}</span>
      <button value="${item.id}" aria-label="Remove ${
        item.name
      }">&times;</button>
      </li>`;
    })
    .join("");
  list.innerHTML = html;
}

function setItemstoLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function getItemsFromLS() {
  let lsItems = JSON.parse(localStorage.getItem("items")) || [];
  items.push(...lsItems);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplite(id) {
  let itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", setItemstoLocalStorage);
list.addEventListener("click", (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches("button")) {
    deleteItem(id);
  }
  if (e.target.matches("input[type='checkbox']")) {
    markAsComplite(id);
  }
});

getItemsFromLS();
