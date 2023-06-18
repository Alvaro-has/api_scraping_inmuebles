const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');


const getFirmapropiedades = (req, res, next) => {
    let inmuebles = [];
    const url = 'https://firmacasas.com/propiedades?key_name=&city%5B%5D=1&property_category%5B%5D=3&type%5B%5D=alquiler&price_min=&num_page=&view_more=1&price_max=&meters_min=&meters_max=';
  
    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
  
        $('.col-md-6.col-lg-6', html).each(function () {
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
          const url=$(this).find('a').attr('href');
          const desc_cleaned = descripcion.replace('\n', ' ').replace('\t', ' ').trim();
  
          inmuebles.push({ img, title, descripcion: desc_cleaned, price, location ,url});
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
  
 
  module.exports = { getFirmapropiedades };
  
