const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const getMercadoPropInmuebles = (req, res, next) => {
  let inmuebles = [];

  const baseURL = 'https://www.mercadoprop.la/bo';
  const url = `${baseURL}//casas-venta-la_paz.html`;

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('.content', html).each(function () {
        const title = $(this).find('h2').text();
        const price = $(this).find('p').text();
        const descripcion = $(this).find('span').text();
        const url = `${baseURL}${$(this).find('a').attr('href')}`;
        const imagen = $(this).prev('.aviso__img');
        const img = `${imagen.find('img').attr('src')}`;

        inmuebles.push({ title, price, descripcion, img, url });
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

module.exports = { getMercadoPropInmuebles };
