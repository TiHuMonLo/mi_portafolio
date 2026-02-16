const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let autoplayInterval;

/* Mostrar slide */
function showSlide() {
  carousel.style.transform = `translateX(${-index * 100}%)`;
}

/* Botón siguiente */
nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length;
  showSlide();
});

/* Botón anterior */
prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  showSlide();
});

/* Autoplay */
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    index = (index + 1) % images.length;
    showSlide();
  }, 5000); // cada 5 segundos
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

/* Iniciar autoplay y pausar con hover */
startAutoplay();
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

