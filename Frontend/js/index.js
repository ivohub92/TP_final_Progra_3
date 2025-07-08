const adminBtn = document.getElementById('modo-admin');

adminBtn.addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/login'; 
});

document.getElementById("btnContinuar").addEventListener("click", async () => { 
    const nombre = document.getElementById("nombreUsuario"); 

    if (nombre.value.trim() === "") {
      alert("Por favor, ingrese un nombre de usuario.");
    } else {
      localStorage.setItem('nombreUsuario', nombre.value.trim());
      window.location.href = "Productos.html"; 
    }
});

function ajustarLinks() {
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  const linkCarrito = document.getElementById('linkCarrito');
  const linkTicket = document.getElementById('linkTicket');
  const linkProductos = document.getElementById('linkProductos');

  if (linkCarrito) {
    linkCarrito.style.pointerEvents = 'none';
    linkCarrito.style.color = 'gray';
  }

  if (linkTicket) {
    linkTicket.style.pointerEvents = 'none';
    linkTicket.style.color = 'gray';
  }

  if (linkProductos) {
    linkProductos.style.pointerEvents = 'none';
    linkProductos.style.color = 'gray';
  }
}

document.addEventListener('DOMContentLoaded', ajustarLinks);
