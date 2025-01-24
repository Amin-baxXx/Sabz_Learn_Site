import { globalSearch } from "./funcs/shared.js";
window.addEventListener("load", () => {
  globalSearch().then((res) => console.log(res));
});
