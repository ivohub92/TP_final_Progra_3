function cargarCarrito() {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const contenedor = document.getElementById('carrito-listado');
    const totalDiv = document.getElementById('carrito-total');
    contenedor.innerHTML = '';
    let total = 0;

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        if (producto.genero){
            img = `http://localhost:3000${producto.imagen}`;
        } else {
            img = `http://localhost:3000${producto.imagen}`;
        }

        productoDiv.innerHTML = `
            
            <img src="${img}" alt="${producto.nombre}">
            <div>
                <h3 class="nombre-producto" >${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <div class="cantidad-control">
                    <button class="restar" data-nombre="${producto.nombre}">-</button>
                    <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                    <button class="sumar" data-nombre="${producto.nombre}">+</button>
                </div>
                <p class="subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
                <button class="Eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    agregarEventosCantidad();
    agregarEventoEliminar();
}

function agregarEventoEliminar() {
    document.querySelectorAll('.Eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nombre = e.target.dataset.nombre;
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];

            productos = productos.filter(p => p.nombre !== nombre);

            localStorage.setItem('productosComprados', JSON.stringify(productos));
            cargarCarrito();
        });
    });
}



function agregarEventosCantidad() {
    document.querySelectorAll('.cantidad-control').forEach(control => {
        control.addEventListener('click', (e) => {
            if (!e.target.classList.contains('sumar') && !e.target.classList.contains('restar')) return;

            const nombre = e.target.dataset.nombre;
            const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            const producto = productos.find(p => p.nombre === nombre);

            const cambio = e.target.classList.contains('sumar') ? 1 : -1;
            producto.cantidad += cambio;
            
            if (producto.cantidad < 1 ) {
                producto.cantidad = 1
            } else if (producto.stock < producto.cantidad) {
                producto.cantidad = producto.stock;
            }

            localStorage.setItem('productosComprados', JSON.stringify(productos));
            cargarCarrito();
        });
    });
}

document.getElementById('pasarTickt').addEventListener('click', () => {
    if (confirm("¿Querés confirmar la compra?")) {
        // Lógica para finalizar la compra
        window.location.href = 'ticket.html';
    } else {
        // Lógica si cancela
        console.log("Compra cancelada");
    }
});

function ajustarLinks() {
    const linkTicket = document.getElementById('linkTicket');
    const linkInicio = document.getElementById('linkInicio');

    linkInicio.addEventListener('click', () => {
        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
    });

    if (linkTicket) {
        linkTicket.style.pointerEvents = 'none';
        linkTicket.style.color = 'gray';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const productos = JSON.parse(localStorage.getItem('productosComprados')) || [];

    if (productos.length == 0) {
        document.getElementById('pasarTickt').style.backgroundColor = 'red';
        document.getElementById('pasarTickt').style.pointerEvents = 'none';
    }

    ajustarLinks();

    cargarCarrito();
});