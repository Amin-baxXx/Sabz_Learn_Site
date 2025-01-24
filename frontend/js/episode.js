import { getSessionsDetails } from "./funcs/shared.js";
window.addEventListener("load", () => {
  getSessionsDetails().then((sessionDetails) => {
    console.log(sessionDetails);
  });
});
