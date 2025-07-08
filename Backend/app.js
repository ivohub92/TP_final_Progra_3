//Carga de módulos escenciales para funcionamiento del servidor

const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');
app.use(express.static('public'));

// Configuración de CORS (para que el frontend pueda consumir la API)

app.use(cors());

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: false
}));

// Configuración de method-override para formularios con PUT y DELETE
app.use(methodOverride('_method'));

// Configuración de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

// Servir imágenes estáticas
app.use('/imagenes/juegos', express.static(path.join(__dirname, 'Estaticos/Imagenes/juegos')));
app.use('/imagenes/giftcards', express.static(path.join(__dirname, 'Estaticos/Imagenes/giftCards')));
app.use('/imagenes/logo', express.static(path.join(__dirname, 'Estaticos/Imagenes/logo')));

// Rutas API
const authRutas = require('./Rutas/api/authRutas');
const juegoRutas = require('./Rutas/api/rutasJuegos');
const rutasCards = require('./Rutas/api/rutasCards');
const ventaRutas = require('./Rutas/api/rutaVentas');
const ticketRutas = require('./Rutas/api/rutasTicket');

// Rutas EJS
const vistasGenerales = require('./Rutas/vista/rutaVistaUsuarios');
const vistasJuegos = require('./Rutas/vista/rutaVistaJuegos');
const vistasGiftCards = require('./Rutas/vista/rutaVistaGiftCards');
const vistasVentas = require('./Rutas/vista/rutaVistaVentas');
const vistaPanel = require('./Rutas/vista/rutaVistaPanel');



// Montar rutas API
app.use('/', authRutas);
app.use('/api/juegos', juegoRutas);
app.use('/api/giftcards', rutasCards);
app.use('/api/ventas', ventaRutas);
app.use('/api/ticket', ticketRutas);


// Montar rutas EJS
app.use('/', vistasGenerales);
app.use('/admin',vistaPanel);
app.use('/admin', vistasJuegos);
app.use('/admin', vistasGiftCards);
app.use('/admin', vistasVentas);



// Conexión con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(process.env.PORT || 3000, () => console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`));
    })
    .catch(err => console.error('Error al sincronizar la base de datos', err));

module.exports = app;