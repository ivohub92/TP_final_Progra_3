const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

// Recibe los datos del ticket por POST y genera PDF para descarga
async function descargarTicket(req, res) {
    const ticket = req.body;

    const html = await ejs.renderFile(
        path.join(__dirname, '../../vistas/ticket/ticket.ejs'),
        { ticket }
    );

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ticket.pdf"`,
      'Content-Length': pdfBuffer.length
    });
    res.status(200).send(pdfBuffer);
}

module.exports = {
    descargarTicket
};