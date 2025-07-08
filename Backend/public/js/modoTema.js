document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.getElementById("pagina");
  const boton = document.getElementById("modo-btn");


  const temaGuardado = localStorage.getItem("tema") || "light";
  aplicarTema(temaGuardado);


  boton.addEventListener("click", () => {
    const temaActual = pagina.getAttribute("data-bs-theme");
    const nuevoTema = temaActual === "light" ? "dark" : "light";
    aplicarTema(nuevoTema);
    localStorage.setItem("tema", nuevoTema);
  });
});

function aplicarTema(tema) {
  const pagina = document.getElementById("pagina");
  const header = document.getElementById("main-header");
  const icono = document.getElementById("icono");
  const boton = document.getElementById("modo-btn");
  const modoclarooscuro = document.querySelectorAll(".modoclarooscuro");

  if (tema === "dark") {
    pagina.setAttribute("data-bs-theme", "dark");
    if (header) header.style.backgroundColor = "#121212";
    pagina.style.backgroundColor = "#1e1e1e";
    pagina.style.color = "#f8f9fa";

    modoclarooscuro.forEach(el => {
      el.classList.remove("bg-light", "text-dark");
      el.classList.add("bg-dark", "text-white");
    });

    icono.textContent = "☀";
    boton.classList.remove("btn-outline-light");
    boton.classList.add("btn-outline-warning");
  } else {
    pagina.setAttribute("data-bs-theme", "light");
    if (header) header.style.backgroundColor = "#1f2d3d";
    pagina.style.backgroundColor = "#ffffff";
    pagina.style.color = "#212529";

    modoclarooscuro.forEach(el => {
      el.classList.remove("bg-dark", "text-white");
      el.classList.add("bg-light", "text-dark");
    });

    icono.textContent = "🌙";
    boton.classList.remove("btn-outline-warning");
    boton.classList.add("btn-outline-light");
  }
}