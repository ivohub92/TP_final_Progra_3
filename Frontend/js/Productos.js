document.addEventListener('DOMContentLoaded', () => {
    let categoriaMostrada = "Todos"
    const cambiar = document.getElementById('cambiar-categoria');

    const cargarProductos = async () => {
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = "";

        try {
            const responseJuegos = await fetch('http://localhost:3000/api/juegos');
            const datosJuegos = await responseJuegos.json();

            const responseCards = await fetch('http://localhost:3000/api/giftcards');
            const datosCards = await responseCards.json();

            const juegos = datosJuegos.map(
                prod => new Juego(prod.id, prod.nombre, prod.precio, prod.empresa, prod.consola, prod.requerimientos_minimos, prod.stock, prod.genero, prod.puntuacion_general, prod.activo, prod.imagen)
            );

            const cards = datosCards.map(
                prod => new GiftCard(prod.id, prod.nombre, prod.precio, prod.empresa, prod.consola, prod.stock,  prod.fecha_caducidad, prod.plataformas_disponibles, prod.imagen, prod.activo)
            );

            cards.forEach(producto => {
                if ((categoriaMostrada === "Todos" || categoriaMostrada == "Gift Card") && producto.activo == 1) {
                    contenedor.appendChild(producto.createHTMLElement());
                }
            });

            juegos.forEach(producto => {
                if ((categoriaMostrada === "Todos" || categoriaMostrada == "Juegos") && producto.activo == 1) {
                    contenedor.appendChild(producto.createHTMLElement());
                }
            });

        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    cambiar.addEventListener('change', () => {
        switch (cambiar.value){
            case 'Todos':
                categoriaMostrada = "Todos";
                cargarProductos();
                break;
            case 'Juegos':
                categoriaMostrada = "Juegos";
                cargarProductos();
                break;
            case 'Gift Card':
                categoriaMostrada = "Gift Card";
                cargarProductos();
                break;
        }   
    });

    ajustarLinks();
    cargarProductos();
});

function ajustarLinks() {
    const linkCarrito = document.getElementById('linkCarrito');
    const linkTicket = document.getElementById('linkTicket');
    const linkInicio = document.getElementById('linkInicio');

    linkInicio.addEventListener('click', (e) => {
        localStorage.removeItem('productosComprados');
        localStorage.removeItem('nombreUsuario');
    });

    if (linkTicket) {
        linkTicket.style.pointerEvents = 'none';
        linkTicket.style.color = 'gray';
    }

    if (linkCarrito) {
        linkCarrito.style.pointerEvents = 'none';
        linkCarrito.style.color = 'gray';
    }
}