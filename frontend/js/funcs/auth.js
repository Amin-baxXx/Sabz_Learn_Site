const register = () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");
  // new User Info
  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };
  fetch(`http://localhost:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfos),
  }).then((response) => {
    if (response.status === 201) {
      showSwal("نام کاربری قبلا استفاده شده", "error", "تحصیح اطلاعات ").then(
        (result) => {
          location.href = "index.html";
        },
      );
    } else if (response.status === 409) {
      showSwal(
        "نام کاربری قبلا استفاده شده",
        "error",
        "تحصیح اطلاعات ",
        () => {},
      );
    }

    return response.json().then((result) => console.log(result));
  });
};
export { register };
