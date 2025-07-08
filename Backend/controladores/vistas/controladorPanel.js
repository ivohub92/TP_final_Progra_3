const axios = require('axios');

exports.panelProductos = async (req, res) => {
  try {
    const token = req.session.token;

    // Headers con autenticación
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const pageJuegos = parseInt(req.query.pageJuegos) || 1;
    const pageGiftcards = parseInt(req.query.pageGiftcards) || 1;

    const juegosResponse = await axios.get(`http://localhost:3000/api/juegos/paginado?page=${pageJuegos}&limit=2`, headers);
    const giftcardsResponse = await axios.get(`http://localhost:3000/api/giftcards/paginado?page=${pageGiftcards}&limit=2`, headers);

    const juegos = juegosResponse.data.juegos;
    const juegosPagination = {
      totalPages: juegosResponse.data.totalPages,
      currentPage: juegosResponse.data.currentPage
    };

    const giftcards = giftcardsResponse.data.giftcards;
    const giftcardsPagination = {
      totalPages: giftcardsResponse.data.totalPages,
      currentPage: giftcardsResponse.data.currentPage
    };

    res.render('admin/panelProductos', {
      juegos,
      juegosPagination,
      giftcards,
      giftcardsPagination,
      token
    });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send('Error al cargar el panel de administración.');
  }
};

