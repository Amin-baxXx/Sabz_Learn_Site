import { getMe } from "./funcs/auth.js";
import { showUserNameInNavbar, renderTopbarMenus } from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameInNavbar();
  renderTopbarMenus();
});
