"use strict";
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  speed: 800,
  loop: true,
  spaceBetween: 20,
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    grabCursor: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // توقف حرکت هنگام هاور
  },
});
