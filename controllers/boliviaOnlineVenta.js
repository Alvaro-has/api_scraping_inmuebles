const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const getboliviaOnlineVentaInmuebles = (req, res, next) => {
  let inmuebles = [];
  const baseUrl = 'https://bolivia.bienesonline.com/casas/venta/la-paz';
  const totalPages = 5;

  const fetchPage = async (pageNumber) => {
    const url = `${baseUrl}?page=${pageNumber}`;

    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $('.item', html).each(function () {
        const text = $(this).find('strong');
        const img = $(this).find('img').attr('src');
        const descripcion = $(this).find('p').text().trim().replace(/\n|\t|\r/g, '').replace(/\s+/g, ' ');
        const title = text.text().trim().replace(/\n|\t|\r/g, '');
        const price = $(this).find('span').text().replace(/\s+/g, ' ');
        const Dorm = $(this).find('p.feat').text().trim().replace(/\n|\t|\r/g, '').replace(/\s+/g, ' ');
        const url = $(this).find('a').attr('href');
        const dorm_cleaned = Dorm.replace('\n', ' ').replace('\t', ' ').trim();
        const desc_cleaned = descripcion.replace('\n', ' ').replace('\t', ' ').trim();

        inmuebles.push({
          img,
          title,
          descripcion: desc_cleaned,
          price,
          Dorm: dorm_cleaned,
          url,
        });
      });

      if (pageNumber < totalPages) {
        fetchPage(pageNumber + 1);
      } else {
        res.status(200).json({
          ok: true,
          data: inmuebles,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchPage(1);
};

module.exports = { getboliviaOnlineVentaInmuebles };
