const body = document.body;
const toggleBtn = document.getElementById("modo-btn");
const icono = document.getElementById("icono");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {
  icono.textContent = "🌙";
} else {
  body.classList.add("light-mode");
  icono.textContent = "☀️";
  localStorage.setItem("theme", "light");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  icono.textContent = isLight ? "☀️" : "🌙";
});
