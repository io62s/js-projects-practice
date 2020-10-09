function Gallery(gallery) {
  if (!gallery) return;

  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");
}

const galleryOne = Gallery(document.querySelector(".gallery1"));
const galleryTwo = Gallery(document.querySelector(".gallery2"));
