"use strict";
const $ = document;
const landing__title = $.querySelector(".landing__title");
const typewriter = function (text, index) {
  if (text.length > index) {
    landing__title.textContent += text[index];
    index++;
  } else return;

  setTimeout(() => {
    typewriter(text, index);
  }, 100);
};
window.addEventListener("load", () => {
  const landingtextContent = "ما به هر قیمتی دوره آموزشی تولید نمیکنیم!";
  let index = 0;
  typewriter(landingtextContent, index);
});
