const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
//onst sharp = require('sharp');



const getboliviaOnlineInmuebles = (req, res, next) => {
  let inmuebles = [];
  const baseUrl = 'https://bolivia.bienesonline.com/departamentos/alquiler/la-paz';
  const pageCount = 5; // Número de páginas a extraer

  const requests = [];
  for (let page = 1; page <= pageCount; page++) {
    const url = `${baseUrl}?pagina=${page}`;
    requests.push(axios.get(url));
  }

  axios
    .all(requests)
    .then(
      axios.spread((...responses) => {
        responses.forEach((response) => {
          const html = response.data;
          const $ = cheerio.load(html);

          $('.item', html).each(async function () {
            const text = $(this).find('strong');
            const url = 'https://bolivia.bienesonline.com/departamentos/alquiler/la-paz' + $(this).find('a').attr('href');
            let img = $(this).find('img').attr('src');
            const descripcion = $(this).find('p').text().trim().replace(/\n|\t|\r/g, '').replace(/\s+/g, ' ');
            const title = text.text().trim().replace(/\n|\t|\r/g, '');
            const price = $(this).find('span').text().replace(/\s+/g, ' ');
            const Dorm = $(this).find('p.feat').text().trim().replace(/\n|\t|\r/g, '').replace(/\s+/g, ' ');
            const dorm_cleaned = Dorm.replace('\n', ' ').replace('\t', ' ').trim();
            const desc_cleaned = descripcion.replace('\n', ' ').replace('\t', ' ').trim();

            if (img && img.startsWith('/')) {
              img = 'https://www.bienesonline.com' + img;
              img = await resizeImage(img, 338, 223); // Redimensionar la imagen
            }

            inmuebles.push({
              img,
              title,
              descripcion: desc_cleaned,
              price,
              Dorm: dorm_cleaned,
              url,
            });
          });
        });

        res.status(200).json({
          ok: true,
          data: inmuebles,
        });
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

// Función para redimensionar la imagen
async function resizeImage(imageUrl, width, height) {
  const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const resizedImageBuffer = await sharp(imageBuffer.data).resize(width, height).toBuffer();
  const resizedImageUrl = `data:image/jpeg;base64,${resizedImageBuffer.toString('base64')}`;
  return resizedImageUrl;
}

module.exports = { getboliviaOnlineInmuebles };

