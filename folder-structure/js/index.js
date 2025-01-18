"use strict";
const $ = document;
const landing__title = $.querySelector(".landing__title");
const count = $.querySelectorAll(".landing-status__count");
// Type function
window.addEventListener("load", () => {
  const landingtextContent = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let index = 0;
  typewriter(landingtextContent, index);
  count.forEach((item) => {
    numWriter(item);
  });
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
    if (+item.dataset.count >= num) {
      requestAnimationFrame(() => updateNumber(num));
    }
  };
  updateNumber();
};
