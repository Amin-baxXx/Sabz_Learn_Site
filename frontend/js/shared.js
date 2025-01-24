import {
  showUserNameInNavbar,
  renderTopbarMenus,
  createNewNewsLetter,
} from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameInNavbar();
  renderTopbarMenus();
  const newsletterSubmitBtn = document.getElementById("news-letter-submit-btn");
  newsletterSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createNewNewsLetter();
  });
});
