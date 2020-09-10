const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

const items = [];

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
      <input type="checkbox">
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}">&times;</button>
      </li>`;
    })
    .join("");
  list.innerHTML = html;
}

function mirrortoLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function getItemsFromLS() {
  let lsItems = JSON.parse(localStorage.getItem("items")) || [];
  items.push(...lsItems);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrortoLocalStorage);

getItemsFromLS();
