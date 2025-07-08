class Juego {
    constructor(id, nombre, precio, empresa, consola, requerimientos_minimos, stock, genero, puntuacion_general, activo, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.empresa = empresa;
        this.consola = consola;
        this.requerimientos_minimos = requerimientos_minimos;
        this.puntuacion_general = puntuacion_general;
        this.genero = genero;
        this.activo = activo;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidad = 0;
    }

    static comprarProducto(producto) {
        console.log("Producto comprado:", producto);
        let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
        const existente = productos.find(p => p.id === producto.id && p.tipo === 'Juego');

        if (existente) {
            if (existente.cantidad < producto.stock) {
                existente.cantidad += 1;
            }
        } else {
            productos.push({ ...producto, tipo: 'Juego', cantidad: 1 });
        }

        localStorage.setItem('productosComprados', JSON.stringify(productos));
    }

    static sacarProducto(producto) {
        let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
        const existente = productos.find(p => p.id === producto.id && p.tipo === 'Juego');

        if (existente) {
            if (existente.cantidad > 1) {
                existente.cantidad -= 1;
            } else {
                productos = productos.filter(p => !(p.id === producto.id && p.tipo === 'Juego'));
            }
            localStorage.setItem('productosComprados', JSON.stringify(productos));
        }
    }

    createHTMLElement() {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'tarjeta-producto';

        const imagen = document.createElement('img');
        imagen.src = 'http://localhost:3000' + this.imagen;
        imagen.alt = this.nombre;
        imagen.className = 'img-producto';

        const nombre = document.createElement('h3');
        nombre.textContent = this.nombre;

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${this.precio}`;

        const genero = document.createElement('p');
        genero.textContent = `Género: ${this.genero}`;

        const empresa = document.createElement('p');
        empresa.textContent = `Empresa: ${this.empresa}`;

        const consola = document.createElement('p');
        consola.textContent = `Plataforma: ${this.consola}`;

        const requerimientos = document.createElement('p');
        requerimientos.textContent = `Requerimientos: ${this.requerimientos_minimos}`;

        const puntuacion = document.createElement('p');
        puntuacion.textContent = `Puntuación: ${this.puntuacion_general}`;

        const cantidadSpan = document.createElement('span');
        let productosEnCarrito = JSON.parse(localStorage.getItem('productosComprados')) || [];
        let productoEnCarrito = productosEnCarrito.find(p => p.id === this.id && p.tipo === 'Juego');
        const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;
        cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;

        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = '+';
        guardarBtn.addEventListener('click', () => {
            Juego.comprarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id && p.tipo === 'Juego');
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.cantidad : 0}`;
        });

        const restarBtn = document.createElement('button');
        restarBtn.textContent = '-';
        restarBtn.addEventListener('click', () => {
            Juego.sacarProducto(this);
            let productos = JSON.parse(localStorage.getItem('productosComprados')) || [];
            let prodActual = productos.find(p => p.id === this.id && p.tipo === 'Juego');
            cantidadSpan.textContent = `Cantidad: ${prodActual ? prodActual.cantidad : 0}`;
        });

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(genero);
        productoDiv.appendChild(empresa);
        productoDiv.appendChild(consola);
        productoDiv.appendChild(requerimientos);
        productoDiv.appendChild(puntuacion);
        productoDiv.appendChild(restarBtn);
        productoDiv.appendChild(cantidadSpan);
        productoDiv.appendChild(guardarBtn);

        return productoDiv;
    }
}
