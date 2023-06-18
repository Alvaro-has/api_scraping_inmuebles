const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getInfoAntiInmuebles = (req, res, next) => {
    let inmuebles= [];
   
   const baseURL = 'https://www.infocasas.com.bo';
   const url = `${baseURL}/anticretico/inmuebles/la-paz`;
   
    axios(url).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const imageUrl=$(".card-image-gallery img").map(function () {
          return $(this).attr("src");
        }).get();
        let index = 0;
        $('.lc-dataWrapper',html).each(function (index) { //lc-dataWrapper
      
          const text = $(this).find('h4'); //h4
          const inmueble={
          title :text.text(),
          url: `${baseURL}${$(this).find('a').attr('href')}`,
          descripcion : $(this).find('p').text(),
          price : $(this).find('.lc-price').text(),
          location: $(this).find('.lc-location').text(),
          Dorm_Baños:$(this).find('.lc-typologyTag').text(),
          img : imageUrl[index],
          }
          
          
        inmuebles.push(inmueble);
         index++;

    });
     res.status(200).json({
        ok: true,
        data: inmuebles,
    });
})
   .catch((err) => {console.log(err);});
};

module.exports= {getInfoAntiInmuebles};
