function generarDatosTicket() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Unknown';
    const fecha = new Date().toLocaleDateString();
    const empresa = "GameGift";

    let total = 0;
    productos.forEach(p => {
        total += p.precio * p.cantidad;
    });

    return {
        cliente: nombreUsuario,
        empresa,
        fecha,
        productos,
        total: total.toFixed(2)
    };
}

function mostrarTicketHTML() {
    const datos = generarDatosTicket();
    const contenedor = document.getElementById('ticket-info');

    if (datos.productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    let html = `
        <p>Empresa: ${datos.empresa}</p>
        <p>Cliente: ${datos.cliente}</p>
        <p>Fecha: ${datos.fecha}</p>
        <hr>
        <h3>Productos:</h3>
    `;

    datos.productos.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        html += `
            <p>
                Nombre: ${p.nombre} - Cantidad: ${p.cantidad} - Precio Unidad: $${p.precio} - Subtotal: $${subtotal.toFixed(2)}
            </p>
        `;
    });

    html += `
        <hr>
        <h3>Total: $${datos.total}</h3>
    `;
    contenedor.innerHTML = html;
}

async function finalizarCompra() {
    const ticket = generarDatosTicket();
    console.log("Datos del ticket:", ticket);

    try {
        const body = {
            nombre: ticket.cliente,
            productos: ticket.productos
        };

        const guardarResponse = await fetch('http://localhost:3000/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!guardarResponse.ok) {
            const errorData = await guardarResponse.json();
            alert("Error al guardar el ticket: " + (errorData.message || errorData.mensaje || "Error desconocido"));
            return;
        }

        const descargarResponse = await fetch('http://localhost:3000/api/ticket/descargarTicket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticket)
        });

        if (!descargarResponse.ok) {
            alert("Error al descargar el PDF del ticket");
            return;
        }

        const blob = await descargarResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ticket.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();

        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error al finalizar compra:", error);
        alert("Error de conexión con el backend");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const btnFinalizar = document.getElementById('btnFinalizar');
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    
    if (productos.length === 0) {
        btnFinalizar.disabled = true;
        return;
    }

   btnFinalizar.addEventListener('click', () => {
    
    btnFinalizar.disabled = true;

   
    const textoOriginal = btnFinalizar.innerHTML;

    // Cambiar contenido del botón a spinner + texto
    btnFinalizar.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Procesando...
    `;
   
    setTimeout(() => {       
        btnFinalizar.innerHTML = textoOriginal;        
        btnFinalizar.disabled = false;        
        finalizarCompra();
    }, 300);
});

    ajustarLinks();
    
    mostrarTicketHTML();
});


function ajustarLinks() {
    const linkInicio = document.getElementById('linkInicio');

    linkInicio.addEventListener('click', () => {
        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
    });
}