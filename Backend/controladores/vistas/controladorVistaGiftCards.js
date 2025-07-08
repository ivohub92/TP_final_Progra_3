const axios = require('axios');

exports.crearGiftCard= (req, res) => {
    res.render('admin/crearGiftCard', {token: req.session.token});
}
exports.editarGiftCard= async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get('http://localhost:3000/api/giftcards');
        const giftcard = response.data.find(g => g.id == id);

        if (!giftcard) return res.status(404).send('GiftCard no encontrada');

        res.render('admin/editarGiftCard', { giftcard,  token: req.session.token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la gift card.');
    }
}