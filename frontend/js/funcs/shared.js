import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken, showSwal } from "../funcs/utils.js";
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
  console.log(courses);
  courses.slice(0, 6).map((course) => {
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
                  <a href="course.html?name=${course.shortName}"
                    ><img
                      class="course-box__img"
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt=""
                  /></a>
                  <div class="course-box__main">
                    <a class="course-box__title" href="course.html?name=${course.shortName}"
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
const getAndShowPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector(
    "#presell-courses-wrapper",
  );

  const res = await fetch(`http://localhost:4000/v1/courses/presell`);
  const presellCourses = await res.json();

  presellCourses.forEach((course) => {
    presellCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${
          course.cover
        } alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">',
            )
            .join("")}
          ${Array(course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">',
            )
            .join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${
            course.price === 0 ? "رایگان" : course.price
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `,
    );
  });

  return presellCourses;
};
const getAndShowArticles = async () => {
  const articelsWrapper = document.querySelector("#articles-wrapper");
  const res = await fetch("http://localhost:4000/v1/articles");
  const articles = await res.json();
  articles.slice(0, 6).forEach((article) => {
    articelsWrapper.insertAdjacentHTML(
      "beforeend",
      `
                  <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img
                      src="http://localhost:4000/courses/covers/${article.cover}"
                      class="article-card__img"
                      alt="Article Cover"
                    />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                  ${article.title}
                  </a>
                  <p class="article-card__text">
                  ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>
      `,
    );
  });
  return articles;
};
const getAndShowNavbarMenus = async () => {
  const menusWrapper = document.querySelector("#menus-wrapper");

  const res = await fetch(`http://localhost:4000/v1/menus`);
  const menus = await res.json();

  menus.forEach((menu) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <li class="main-header__item">
    <a href=category.html?cat=${menu.href} class="main-header__link">${
      menu.title
    }
      ${
        menu.submenus.length !== 0
          ? `<i class="fas fa-angle-down main-header__link-icon"></i>
        <ul class="main-header__dropdown">
        ${menu.submenus
          .map(
            (submenu) =>
              `<li class="main-header__dropdown-item">
            <a href="#" class="main-header__dropdown-link">
             ${submenu.title}
            </a>
          </li>`,
          )
          .join("")}
        </ul>`
          : ""
      }
    </a>
  </li>
    `,
    );
  });

  return menus;
};
const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");
  const res = await fetch(
    `http://localhost:4000/v1/courses/category${categoryName}`,
  );
  const courses = await res.json();
  return courses;
};
const insertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
  parentElement.innerHTML = "";
  if (showType === "row") {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-4">
            <div class="course-box">
              <a href="#">
                <img src="images/courses/js_project.png" alt="Course img" class="course-box__img" />
              </a>
              <div class="course-box__main">
                <a href="#" class="course-box__title">${course.name}</a>
        
                <div class="course-box__rating-teacher">
                  <div class="course-box__teacher">
                    <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                    <a href="#" class="course-box__teacher-link">${
                      course.creator
                    }</a>
                  </div>
                  <div class="course-box__rating">
                    ${Array(5 - course.courseAverageScore)
                      .fill(0)
                      .map(
                        (score) =>
                          '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">',
                      )
                      .join("")}
                    ${Array(course.courseAverageScore)
                      .fill(0)
                      .map(
                        (score) =>
                          '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">',
                      )
                      .join("")}
                  </div>
                </div>
        
                <div class="course-box__status">
                  <div class="course-box__users">
                    <i class="fas fa-users course-box__users-icon"></i>
                    <span class="course-box__users-text">${
                      course.registers
                    }</span>
                  </div>
                  <span class="course-box__price">${
                    course.price === 0
                      ? "رایگان"
                      : course.price.toLocaleString()
                  }</span>
                </div>
              </div>
        
              <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                  مشاهده اطلاعات
                  <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
              </div>
        
            </div>
          </div>
            `,
      );
    });
  } else {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-12">
      <div class="course-box">
          <div class="course__box-header">
              <div class="course__box-right">
                  <a class="course__box-right-link" href="#">
                      <img src=http://localhost:4000/courses/covers/${
                        course.cover
                      } class="course__box-right-img">
                  </a>
              </div>
              <div class="course__box-left">
                  <div class="course__box-left-top">
                      <a href="#" class="course__box-left-link">${
                        course.name
                      }</a>
                  </div>
                  <div class="course__box-left-center">
                      <div class="course__box-left-teacher">
                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                          <span class="course__box-left-name">${
                            course.creator
                          }</span>
                      </div>
                      <div class="course__box-left-stars">
                        ${Array(5 - course.courseAverageScore)
                          .fill(0)
                          .map(
                            (score) =>
                              '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">',
                          )
                          .join("")}
                        ${Array(course.courseAverageScore)
                          .fill(0)
                          .map(
                            (score) =>
                              '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">',
                          )
                          .join("")}
                      </div>
                  </div>
                  <div class="course__box-left-bottom">
                      <div class="course__box-left-des">
                          <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                              که
                              حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                              سازی
                              نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                              شما هم
                              اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                              کاربردی
                              که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                      </div>
                  </div>
                  <div class="course__box-footer">
                      <div class="course__box-footer-right">
                          <i class="course__box-footer-icon fa fa-users"></i>
                          <span class="course__box-footer-count">${
                            course.registers
                          }</span>
                      </div>
                      <span class="course__box-footer-left">${
                        course.price === 0
                          ? "رایگان"
                          : course.price.toLocaleString()
                      }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `,
      );
    });
  }
};
const coursesSorting = (array, filterMethod) => {
  let outputArray = [];
  switch (filterMethod) {
    case "free":
      {
        outputArray = array.filter((course) => course.price === 0);
      }
      break;
    case "money":
      {
        outputArray = array.filter((course) => course.price > 0);
      }
      break;
    case "first":
      {
        outputArray = [...array].reverse();
      }
      break;
    case "last":
      {
        outputArray = array;
      }
      break;
    case "default": {
      outputArray = array;
    }
    default: {
      outputArray = array;
    }
  }

  return outputArray;
};
const getCourseDetails = () => {
  const courseShortName = getUrlParam("name");
  // Select Elmss From Dom
  const $ = document;
  const courseTitleElem = $.querySelector(".course-info__title");
  const courseLastUpdateElem = $.querySelector(
    ".course-boxes__box-left--last-update",
  );
  const courseSupportElem = $.querySelector(".course-boxes__box-left-support");
  const courseStudentsCountElem = $.querySelector(
    ".course-info__total-sale-number",
  );
  const courseDescriptionElem = $.querySelector(".course-info__text");
  const courseCategoryElem = $.querySelector(".course-info__link");
  const courseStatusElem = $.querySelector(".course-boxes__box-left-subtitle");
  const courseCommentsCountElem = $.querySelector(
    ".course-info__total-comment-text",
  );
  const courseRegisterInfoElem = $.querySelector(
    ".course-info__register-title",
  );
  // Comments Selection
  const commentsContentWrapper = $.querySelector(".comments__content");

  fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
      console.log(course);
      courseCategoryElem.textContent = course.categoryID.title;
      courseTitleElem.textContent = course.name;
      courseDescriptionElem.textContent = course.description;
      courseRegisterInfoElem.insertAdjacentHTML(
        "beforeend",
        ` ${course.isUserRegisteredToThisCourse ? "دانشجوی دوره هستید" : "ثبت نام در دوره"}
      `,
        (courseStatusElem.textContent = course.isComplete
          ? "تکمیل شده"
          : "در حال برگزاری"),
      );
      courseSupportElem.textContent = course.support;
      courseLastUpdateElem.textContent = course.updatedAt.slice(0, 10);
      courseCommentsCountElem.textContent = ` ${course.comments.length}دیدگاه`;
      courseStudentsCountElem.textContent = course.courseStudentsCount;
      //   Show Course sessions
      const sessionsWrapper = $.querySelector(".sessions-wrapper");

      if (course.sessions.length) {
        course.sessions.forEach((session, index) => {
          sessionsWrapper.insertAdjacentHTML(
            "beforeend",
            `
              <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion-right">
                  <span class="introduction__accordion-count">${
                    index + 1
                  }</span>
                  <i class="fab fa-youtube introduction__accordion-icon"></i>
                  ${
                    session.free || course.isUserRegisteredToThisCourse
                      ? `
                        <a href="episode.html?name=${course.shortName}&id=${session._id}" class="introduction__accordion-link">
                          ${session.title}
                        </a>
                    `
                      : `
                        <span class="introduction__accordion-link">
                          ${session.title}
                        </span>
               
                    `
                  }
                  </div>
                <div class="introduction__accordion-left">
                  <span class="introduction__accordion-time">
                    ${session.time}
                  </span>
                  ${
                    !(session.free || course.isUserRegisteredToThisCourse)
                      ? `
                      <i class="fa-solid fa-lock"></i>
                    `
                      : ""
                  }
                </div>
              </div>
          `,
          );
        });
      } else {
        sessionsWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion-right">
                  <span class="introduction__accordion-count"> -- </span>
                  <i class="fab fa-youtube introduction__accordion-icon"></i>
                  <a href="#" class="introduction__accordion-link">
                    هنوز جلسه‌ای آپلود نشده
                  </a>
                </div>
                <div class="introduction__accordion-left">
                  <span class="introduction__accordion-time">
                    00:00
                  </span>
                </div>
              </div>
          `,
        );
      }
      //   Show Course Commnets
      if (course.comments.length) {
        course.comments.forEach((comment) => {
          commentsContentWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="comments__item">
              <div class="comments__question">
                  <div class="comments__question-header">
                      <div class="comments__question-header-right">
                          <span class="comments__question-name comment-name">${comment.creator.name}</span>
                          <span class="comments__question-status comment-status">
                          (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                              </span>
                          <span class="comments__question-date comment-date">${comment.createdAt.slice(0, 10)}</span>
                      </div>
                      <div class="comments__question-header-left">
                          <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                      </div>
                  </div>
                  <div class="comments__question-text">
                     
                      <p class="comments__question-paragraph comment-paragraph">
                        ${comment.body}
                      </p>
                  </div>
              </div>
              ${
                comment.answerContent
                  ? `
                    <div class="comments__ansewr">
                        <div class="comments__ansewr-header">
                            <div class="comments__ansewr-header-right">
                                <span class="comments__ansewr-name comment-name">
                               ${comment.answerContent.creator.name}
                                    </span>
                                <span class="comments__ansewr-staus comment-status">
                                  (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                                </span>
                                <span class="comments__ansewr-date comment-date">1401/04/21</span>
                            </div>
                            <div class="comments__ansewr-header-left">
                                <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                            </div>
                        </div>
                        <div class="comments__ansewr-text">
                            <p class="comments__ansewr-paragraph comment-paragraph">
                              ${comment.answerContent.body}
                            </p>
                        </div>
                    </div>
                  `
                  : ""
              }
            </div>
        `,
          );
        });
      } else {
        commentsContentWrapper.insertAdjacentHTML(
          "beforeend",
          `
           <div class="alert alert-danger">هنوز هیچ نظری برای این دوره ثبت نشده </div>
          `,
        );
      }
    });
};
const getAndShowRelatedCourses = async () => {
  const courseShortName = getUrlParam("name");

  const courseRelatedCoursesWrapper = document.querySelector(
    ".course-info__courses-list",
  );

  const res = await fetch(
    `http://localhost:4000/v1/courses/related/${courseShortName}`,
  );
  const relatedCourses = await res.json();

  if (relatedCourses.length) {
    relatedCourses.forEach((course) => {
      courseRelatedCoursesWrapper.insertAdjacentHTML(
        "beforeend",
        `
          <li class="course-info__courses-list-item">
            <a href="course.html?name=${course.shortName}" class="course-info__courses-link">
              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="Course Cover" class="course-info__courses-img">
              <span class="course-info__courses-text">
                ${course.name}
              </span>
            </a>
        </li>
      `,
      );
    });
  } else {
  }

  return relatedCourses;
};
const getSessionsDetails = async () => {
  //   Episode Selection
  const sessionVidoeElem = document.querySelector(".episode-content__video");
  const courseSessionsListElem = document.querySelector(
    ".sidebar-topics__list",
  );
  const courseShortName = getUrlParam("name");
  const sessionID = getUrlParam("id");
  const res = await fetch(
    `http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  const responseData = await res.json();
  sessionVidoeElem.setAttribute(
    "src",
    `http://localhost:4000/courses/covers/${responseData.session.video}`,
  );
  responseData.sessions.forEach((session) => {
    courseSessionsListElem.insertAdjacentHTML(
      "beforeend",
      `
            <li class="sidebar-topics__list-item">
            <div class="sidebar-topics__list-right">
            <i class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon"></i>
            ${
              session.free
                ? `            <a class="sidebar-topics__list-item-link" href="episode.html?name${courseShortName}&id=${sessionID}">${session.title}</a>
`
                : `            <span class="sidebar-topics__list-item-link">${session.title}</span>
`
            }
            
</div>
        <div class="sidebar-topics__list-left">
        <span class="sidebar-topics__list-item-time">${session.time}</span>
</div>
</li>
            `,
    );
  });
  return responseData;
};
const submitContactUsMsg = async () => {
  const nameInputElem = document.querySelector("#name");
  const emailInputElem = document.querySelector("#email");
  const phoneInputElem = document.querySelector("#phone");
  const bodyInputElem = document.querySelector("#body");
  const newContactUsInfos = {
    name: nameInputElem.value.trim(),
    email: emailInputElem.value.trim(),
    phone: phoneInputElem.value.trim(),
    body: bodyInputElem.value.trim(),
  };
  const res = await fetch("http://localhost:4000/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContactUsInfos),
  });
  if (res.status === 201) {
    showSwal("پیغامتان با موفقیت دریافت شد😉", "success", "ورود به پنل", () => {
      location.href = "index.html";
    });
  } else {
    showSwal(
      " مشکلی در ارسال پیام وجود دارد😢 \nلطفا بعدا تست کنید",
      "error",
      "ناراحت شدم",
    );
  }

  return res;
};
const createNewNewsLetter = async () => {
  const newsLetterInput = document.querySelector("#news-letter-input");
  const newNewsLetterEmailObj = {
    email: newsLetterInput.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/newsletters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNewsLetterEmailObj),
  });

  if (res.ok) {
    showSwal(
      "با موفقیت در خبرنامه سبزلرن عضو شدید",
      "success",
      "متوجه شدم",
      () => {},
    );
  }
};
const globalSearch = async () => {
  const searchValue = getUrlParam("value");
  const coursesSearchResultWrapper =
    document.querySelector("#courses-container");
  const articlesSearchResultWrapper =
    document.querySelector("#articles-wrapper");

  const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`, {});
  const data = await res.json();
  if (data.allResultCourses.length > 0) {
    data.allResultCourses.forEach((course) => {
      coursesSearchResultWrapper.insertAdjacentHTML(
        "beforeend",
        `               <div class="col-4">
                <div class="courses-box">
                  <a href="course.html?name=${course.shortName}"
                    ><img
                      class="course-box__img"
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt=""
                  /></a>
                  <div class="course-box__main">
                    <a class="course-box__title" href="course.html?name=${course.shortName}"
                      >${course.name}</a
                    >
                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i
                          class="fas fa-chalkboard-teacher course-box__teacher-icon"
                        ></i>
                        <a class="course-box__teacher-link" href="#"
                          >امین موحدی راد</a
                        >
                      </div>
                      <div class="course-box__rating">
                                   <div class="course-box__rating">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">

                  </div>

                      </div>
                    </div>
                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users"> </i>
                        <span class="course-box__users-test">${Math.floor(Math.random() * 1000)}</span>
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
              </div>`,
      );
    });
  } else {
    coursesSearchResultWrapper.insertAdjacentHTML(
      "beforeend",
      `
                     <div class="alert alert-danger">هیچ دوره ای برای جست جوی شما یافت نشد</div>

          `,
    );
  }
  if (data.allResultArticles.length > 0) {
    data.allResultArticles.forEach((article) => {
      articlesSearchResultWrapper.insertAdjacentHTML(
        "beforeend",
        `
              <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img
                      src="http://localhost:4000/courses/covers/${article.cover}"
                      class="article-card__img"
                      alt="Article Cover"
                    />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                  ${article.title}
                  </a>
                  <p class="article-card__text">
                  ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>
          `,
      );
    });
  } else {
    coursesSearchResultWrapper.insertAdjacentHTML(
      "beforeend",
      `
                     <div class="alert alert-danger">هیچ مقاله ای برای جست جوی شما یافت نشد</div>

          `,
    );
  }

  return data;
};
export {
  showUserNameInNavbar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
  getAndShowCategoryCourses,
  insertCourseBoxHtmlTemplate,
  coursesSorting,
  getCourseDetails,
  getAndShowRelatedCourses,
  getSessionsDetails,
  submitContactUsMsg,
  createNewNewsLetter,
  globalSearch,
};
