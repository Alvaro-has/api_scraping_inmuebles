const axios = require('axios');
const cheerio = require('cheerio');

const getRemaxInmuebles = (req, res, next) => {
  let inmuebles = [];

  const url = 'https://c21.com.bo/busqueda/tipo_departamento-o-penthouse/operacion_venta/uso_habitacional';

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('.card').each(function () {
        const title = $(this).find('.card-title').text().trim();
        const address = $(this).find('.card-subtitle').eq(0).text().trim();
        const details = $(this).find('.card-subtitle').eq(1).text().trim();
        const description = $(this).find('.crop-text-2').text().trim();

        inmuebles.push({ title, address, details, description });
      });

      res.status(200).json({
        ok: true,
        data: inmuebles,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        ok: false,
        error: 'Error en la extracción de datos',
      });
    });
};

module.exports = { getRemaxInmuebles };
