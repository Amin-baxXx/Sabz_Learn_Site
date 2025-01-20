import { getMe } from "./auth.js";
import { isLogin } from "../funcs/utils.js";
let ratingHTML = "";
const showUserNameInNavbar = () => {
  const navbarProfileBox = document.querySelector(".main-header__profile");
  const isUserLogin = isLogin();
  if (isUserLogin) {
    const userInfos = getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "index.html");
      navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarProfileBox.setAttribute("href", "login.html");
    navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ثبت نام / ورود کاربر</span>`;
  }
};
const renderTopbarMenus = async () => {
  const topBarList = document.querySelector(".top-bar__menu");
  const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
  const topBarMenus = await res.json();
  const shuffleArray = topBarMenus.sort(() => Math.random() - 0.5);
  topBarList.innerHTML = "";
  [...shuffleArray].splice(0, 6).map((menu) => {
    topBarList.innerHTML += `
    <li class="top-bar__item">
    <a href="#" class="top-bar__link">${menu.title}</a>
    </li>
    `;
  });
};
const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");
  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  courses.slice(1, 7).map((course) => {
    const starsNum = course.courseAverageScore; // تعداد ستاره‌ها
    // اینجا HTML ستاره‌ها رو می‌سازیم
    switch (starsNum) {
      case 2: {
        ratingHTML = `
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
    
`;
        break;
      }
      case 3: {
        ratingHTML = `
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
    `;
        break;
      }
      case 4: {
        ratingHTML = `
      <img class="course-box__stars" src="images/svgs/star.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
    `;
        break;
      }
      case 5: {
        ratingHTML = `
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
      <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />
    `;
        break;
      }
      default: {
        console.log("Invalid rating!");
      }
    }

    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
             <div class="col-4">
                <div class="courses-box">
                  <a href="#"
                    ><img
                      class="course-box__img"
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt=""
                  /></a>
                  <div class="course-box__main">
                    <a class="course-box__title" href="#"
                      >${course.name}</a
                    >
                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i
                          class="fas fa-chalkboard-teacher course-box__teacher-icon"
                        ></i>
                        <a class="course-box__teacher-link" href="#"
                          >${course.creator}</a
                        >
                      </div>
                      <div class="course-box__rating">
                     ${ratingHTML}
                      </div>
                    </div>
                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"> </i>
                        <span class="course-box__users-test">${course.registers}</span>
                      </div>
                      <span class="course-box__price">${course.price > 0 ? course.price.toLocaleString("fa-IR") : "رایگان"}</span>
                    </div>
                  </div>
                  <hr />
                  <div class="course-box__footer">
                    <a class="course-box__footer-link" href="#"
                      >مشاهده دوره
                      <i class="fas fa-arrow-left course-box__footer-icon"></i
                    ></a>
                  </div>
                </div>
              </div>
         `,
    );
  });
  return courses;
};
const getAndShowPopularCourses = async () => {
  const popularCoursesWrapper = document.querySelector(
    "#popular-courses-wrapper",
  );
  const res = await fetch(`http://localhost:4000/v1/courses/popular`);
  const popluarCourses = await res.json();
  popluarCourses.forEach((course) => {
    popularCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
                  <div class="swiper-slide">
                <div class="courses-box">
                  <a href="#"
                    ><img
                      class="course-box__img"
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt=""
                  /></a>
                  <div class="course-box__main">
                    <a class="course-box__title" href="#"
                      >${course.name}</a
                    >
                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i
                          class="fas fa-chalkboard-teacher course-box__teacher-icon"
                        ></i>    


                        <a class="course-box__teacher-link" href="#"
                          >${course.creator}</a
                        >
                      </div>
                      <div class="course-box__rating">
                      ${Array(5 - course.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            '        <img class="course-box__star" src="images/svgs/star.svg" alt="rating_star" />',
                        )
                        .join("")}
                      ${Array(course.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            '        <img class="course-box__stars" src="images/svgs/star_fill.svg" alt="rating_star" />',
                        )
                        .join("")}  
                            
                      </div>
                    </div>
                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"> </i>
                        <span class="course-box__users-test">${course.registers}</span>
                      </div>
                      <span class="course-box__price">${course.price > 0 ? course.price.toLocaleString("fa-ir") : "رایگان"}</span>
                    </div>
                  </div>
                  <hr />
                  <div class="course-box__footer">
                    <a class="course-box__footer-link" href="#"
                      >مشاهده دوره
                      <i class="fas fa-arrow-left course-box__footer-icon"></i
                    ></a>
                  </div>
                </div>
              </div>
`,
    );
  });
  return popluarCourses;
};
export {
  showUserNameInNavbar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getAndShowPopularCourses,
};
