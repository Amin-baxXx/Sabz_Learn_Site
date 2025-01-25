import {
  getCourseDetails,
  getAndShowRelatedCourses,
  submitComment,
} from "./funcs/shared.js";
window.addEventListener("load", () => {
  const submitCommentBtn = document.querySelector(".comments__respond-btn");
  submitCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Hello");
    submitComment().then((result) => {
      console.log(result);
    });
  });

  getCourseDetails();
  getAndShowRelatedCourses().then((courses) => {
    console.log(courses);
  });
});
