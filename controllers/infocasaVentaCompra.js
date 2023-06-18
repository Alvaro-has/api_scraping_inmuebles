const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const getInfoVentaInmuebles = (req, res, next) => {
    let inmuebles = [];
    
    const baseURL = "https://www.infocasas.com.bo";
    const url = `${baseURL}/venta/inmuebles/la-paz`;
  
    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
  
        // Obtener todas las URL de imágenes
        const imageUrls = $(".card-image-gallery img").map(function () {
          return $(this).attr("src");
        }).get();


        let index = 0;
        $(".lc-dataWrapper", html).each(function (index) {
          const text = $(this).find("h4");
          const inmueble ={
          title :text.text(),
          descripcion:  $(this).find("p").text(),
          price  :$(this).find(".lc-price").text(),
          location : $(this).find(".lc-location").text(),
          Dorm_Baños:  $(this).find(".lc-typologyTag").text(),
          url :`${baseURL}${$(this).find("a").attr("href")}`,
          img : imageUrls[index],
        };
          inmuebles.push(inmueble);
          index++;
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
  
  module.exports = { getInfoVentaInmuebles };
  