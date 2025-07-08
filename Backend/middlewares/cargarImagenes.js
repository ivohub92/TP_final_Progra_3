const multer = require('multer');
const path = require('path');

// Filtro para tipos permitidos
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png/;
    const extName = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeType = tiposPermitidos.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Error: Solo se permiten imágenes JPEG, JPG y PNG'));
    }
};

// Configuración para juegos
const storageJuegos = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './estaticos/imagenes/juegos'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Configuración para gift cards
const storageGiftCards = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './estaticos/imagenes/giftCards'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const imagenJuegos = multer({ storage: storageJuegos, fileFilter });
const imagenGiftCards = multer({ storage: storageGiftCards, fileFilter });

module.exports = { imagenJuegos, imagenGiftCards };
