const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

const items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name: name,
    id: Date.now(),
    complete: false,
  };

  items.push(item);
  console.log(items);

  //clear input
  e.target.reset();
  displayItems();
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

shoppingForm.addEventListener("submit", handleSubmit);
