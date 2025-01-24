"use strict";
import { submitContactUsMsg } from "./funcs/shared.js";
window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("news-letter-submit-btn");
  submitBtn.addEventListener("click", () => {
    submitContactUsMsg();
  });
});
