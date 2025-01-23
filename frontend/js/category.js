import {
  getAndShowCategoryCourses,
  insertCourseBoxHtmlTemplate,
  coursesSorting,
} from "./funcs/shared.js";
import { searchInArray } from "./funcs/utils.js";

window.addEventListener("load", () => {
  // Search Bar Logic
  const coursesSearchInput = document.querySelector(".courses-top-bar__input");
  // end
  getAndShowCategoryCourses().then((responseCourses) => {
    // Add sort
    const coursestopBar__selectionTitle = document.querySelector(
      ".courses-top-bar__selection-title",
    );
    const coursestopbar__selectionItem = document.querySelectorAll(
      ".courses-top-bar__selection-item",
    );
    let courses = [...responseCourses];
    let coursesShowType = "row";
    const coursesShowTypeIcons = document.querySelectorAll(
      ".courses-top-bar__icon-parent",
    );
    const categoryCoursesWrapper = document.querySelector(
      "#category-courses-wrapper",
    );

    // Show Category Courses By row showType
    if (courses.length) {
      insertCourseBoxHtmlTemplate(
        courses,
        coursesShowType,
        categoryCoursesWrapper,
      );
    } else {
      categoryCoursesWrapper.insertAdjacentHTML(
        "beforeend",
        `
              <div class="alert alert-danger">هیچ دوره‌ای برای این دسته بندی وجود ندارد :/</div>
            `,
      );
    }

    coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
      coursesShowTypeIcon.addEventListener("click", (event) => {
        coursesShowTypeIcons.forEach((icon) =>
          icon.classList.remove("courses-top-bar__icon--active"),
        );
        event.currentTarget.classList.add("courses-top-bar__icon--active");

        if (String(event.currentTarget.className).includes("row")) {
          coursesShowType = "row";
          insertCourseBoxHtmlTemplate(
            courses,
            coursesShowType,
            categoryCoursesWrapper,
          );
        } else {
          coursesShowType = "column";
          insertCourseBoxHtmlTemplate(
            courses,
            coursesShowType,
            categoryCoursesWrapper,
          );
        }
      });
    });
    coursestopbar__selectionItem.forEach((item) => {
      item.addEventListener("click", () => {
        coursestopBar__selectionTitle.textContent = item.textContent;
        // let userFiltringSelection = item.dataset.key;
        // Add Sort Logic
        let showcourses = coursesSorting([...courses], item.dataset.key);
        insertCourseBoxHtmlTemplate(
          showcourses,
          coursesShowType,
          categoryCoursesWrapper,
        );
      });
    });

    // Handle Search In  Courses
    coursesSearchInput.addEventListener("input", (event) => {
      const showCourses = searchInArray(
        [...responseCourses],
        "name",
        event.target.value,
      );
      if (showCourses.length) {
        categoryCoursesWrapper.innerHTML = "";

        insertCourseBoxHtmlTemplate(
          showCourses,
          coursesShowType,
          categoryCoursesWrapper,
        );
      } else {
        categoryCoursesWrapper.innerHTML = "";
        categoryCoursesWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div class="alert alert-danger">هیچ دوره‌ای برای جست و جوی شما وجود ندارد :/</div>
            `,
        );
      }
    });
  });
});
