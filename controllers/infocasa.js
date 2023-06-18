const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getinfocasaInmuebles = (req, res, next) => {
  let inmuebles= [];
  const baseURL = 'https://www.infocasas.com.bo';
  const url = `${baseURL}/alquiler/inmuebles/la-paz`;
axios(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const imageUrls = $(".card-image-gallery img").map(function () {
        return $(this).attr("src");
    }).get();
    
    let index = 0;

    $('.lc-dataWrapper', html).each(function (index) {
        const text = $(this).find('h4');
        const inmueble = {
            title: text.text(),
            descripcion: $(this).find('p').text(),
            price: $(this).find('.lc-price').text(),
            location: $(this).find('.lc-location').text(),
            Dorm_Baños: $(this).find('.lc-typologyTag').text(),
            url: `${baseURL}${$(this).find('a').attr('href')}`
        };

        const imageUrl = imageUrls[index];
        const isImageUrlValid = /\.(jpe?g|png|gif)$/i.test(imageUrl);

        if (isImageUrlValid) {
            inmueble.img = imageUrl;
        } else {
            inmueble.img = "https://example.com/no-image.jpg";
        }

        inmuebles.push(inmueble);
        index++;
    });

    res.status(200).json({
        ok: true,
        data: inmuebles,
    });
}).catch((err) => {
    console.log(err);
});
};

module.exports = { getinfocasaInmuebles };/*

/*const getinfocasaInmuebles = (req, res, next) => {
    let inmuebles= [];
   //const url = 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz';
   const baseURL = 'https://www.infocasas.com.bo';
   const url = `${baseURL}/alquiler/inmuebles/la-paz`;
   
    axios(url).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const imageUrl=$(".card-image-gallery img").map(function () {
        return $(this).attr("src");
     

      } ).get();
     
      let index = 0;

        $('.lc-dataWrapper',html).each(function (index) { 
          
          const text = $(this).find('h4'); //h4
          const inmueble={
          title :text.text(),
         
          descripcion: $(this).find('p').text(),
          price  :$(this).find('.lc-price').text(),
          location: $(this).find('.lc-location').text(),
          Dorm_Baños:$(this).find('.lc-typologyTag').text(),
          img:imageUrl[index],
          url:`${baseURL}${$(this).find('a').attr('href')}`,
          };
          
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

module.exports= {getinfocasaInmuebles};



*/


