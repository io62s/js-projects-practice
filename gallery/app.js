function Gallery(gallery) {
  if (!gallery) return;

  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    if (modal.matches(".open")) {
      return;
    }

    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function showImage(el) {
    if (!el) return;

    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  images.forEach((image) => {
    image.addEventListener("click", (e) => showImage(e.currentTarget));
  });

  modal.addEventListener("click", handleClickOutside);
}

const galleryOne = Gallery(document.querySelector(".gallery1"));
const galleryTwo = Gallery(document.querySelector(".gallery2"));
