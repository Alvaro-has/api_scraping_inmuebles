const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

  const getFirmaAnticretico = (req, res, next) => {
    const categories = ['11', '1', '3']; // Códigos de categoría para oficinas, departamentos y casas respectivamente
    const urlBase = 'https://firmacasas.com/propiedades?key_name=&city%5B%5D=1&zone%5B%5D=1&zone%5B%5D=2&zone%5B%5D=3&zone%5B%5D=195&zone%5B%5D=5&zone%5B%5D=6&zone%5B%5D=7&zone%5B%5D=189&zone%5B%5D=8&zone%5B%5D=10&zone%5B%5D=11&zone%5B%5D=15&zone%5B%5D=17&zone%5B%5D=20&zone%5B%5D=21&zone%5B%5D=23&zone%5B%5D=24&zone%5B%5D=25&zone%5B%5D=207&zone%5B%5D=26&zone%5B%5D=27&zone%5B%5D=28&zone%5B%5D=317&zone%5B%5D=214&zone%5B%5D=29&zone%5B%5D=30&zone%5B%5D=310&zone%5B%5D=201&zone%5B%5D=34&zone%5B%5D=35&zone%5B%5D=205&zone%5B%5D=209&zone%5B%5D=37&zone%5B%5D=36&property_category%5B%5D=';
  
    const numPages = 5; // Número de páginas a recorrer
    const inmuebles = [];
    const requests = [];
  
    for (let i = 1; i <= numPages; i++) {
      categories.forEach((category) => {
        const pageUrl = `${urlBase}${category}&type%5B%5D=anticretico&num_page=${i}`;
        requests.push(axios.get(pageUrl));
      });
    }
  
    Promise.all(requests)
      .then((responses) => {
        responses.forEach((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
  
          $('.col-md-6.col-lg-6', html).each(function () {
            // Obtener datos de la propiedad
            // ...
            const contentTopHead = $(this).find('.content_top_head');
            const departamento = contentTopHead.find('.text-thm.font-weight-bold').text();
            const alquiler = contentTopHead.find('.tag_right').text();
  
            const text = $(this).find('.tag_right p');
            const img = $(this).find('img').attr('src');
            const descripcion = $(this).find('h4').text().trim().replace(/\n|\t|\r/g, '').replace(/\s+/g, ' ');
            const title = text.contents().filter(function() {
              return this.nodeType === 3; // Filtrar solo los nodos de texto
            }).text().trim() + ' ' + departamento + ' ' + alquiler;
            const price = $(this).find('.w-100').first().text().replace(/\s+/g, ' ');
            const location = $(this).find('.address-p').text().replace(/\s+/g, ' ');
            const url = $(this).find('a').attr('href');
            const desc_cleaned = descripcion.replace('\n', ' ').replace('\t', ' ').trim();
            inmuebles.push({ img, title, descripcion, price, location, url });
          });
        });
  
        res.status(200).json({
          ok: true,
          data: inmuebles,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  module.exports = { getFirmaAnticretico };
  
