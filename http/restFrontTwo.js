const form = document.querySelector("#form-name");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  console.log(name);
});
