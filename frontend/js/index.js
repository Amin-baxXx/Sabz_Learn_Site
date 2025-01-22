"use strict";
import {
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
} from "./funcs/shared.js";

const $ = document;
const landing__title = $.querySelector(".landing__title");
const landingstatus__count = $.querySelectorAll(".landing-status__count");
// Load function
window.addEventListener("load", () => {
  // typewriter Loader
  const landingtextContent = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let index = 0;
  typewriter(landingtextContent, index);
  // numWriter Loader
  landingstatus__count.forEach((item) => {
    numWriter(item);
  });
  getAndShowAllCourses();
  getAndShowPopularCourses();
  getAndShowPresellCourses();
  getAndShowArticles();
  getAndShowNavbarMenus().then((data) => console.log(data));
});

const typewriter = function (text, index) {
  if (text.length > index) {
    landing__title.textContent += text[index];
    index++;
  } else return;

  setTimeout(() => {
    typewriter(text, index);
  }, 100);
};

// Implement animated number counter
const numWriter = function (item) {
  const updateNumber = (num = 0) => {
    item.textContent = num.toLocaleString("fa-IR");
    num++;
    if (+item.dataset.count >= +num) {
      requestAnimationFrame(() => updateNumber(num));
    }
  };
  updateNumber();
};
