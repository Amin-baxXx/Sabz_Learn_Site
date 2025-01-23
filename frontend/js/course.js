import { getCourseDetails, getAndShowRelatedCourses } from "./funcs/shared.js";
window.addEventListener("load", () => {
  getCourseDetails();
  getAndShowRelatedCourses().then((courses) => {
    console.log(courses);
  });
});
