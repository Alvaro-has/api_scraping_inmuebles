
const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getRemaxInmuebles = (req, res, next) => {
    let inmuebles= [];

    //const url= 'https://www.remax.bo/';
   //const url ='https://c21.com.bo/';
   //const  url ='https://www.booking.com/';
   const baseURL = 'https://www.mercadoprop.la/bo';
   const url = `${baseURL}/departamentos-alquiler-la_paz.html`;
   
    axios(url).then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        $('.content',html).each(function () { 
        
          //const title=$(this).find('.col-xl-6').text();
          const title=$(this).find('h2').text();
          const price = $(this).find('p').text();
          const descripcion=$(this).find('span').text();
          const url= `${baseURL}${$(this).find('a').attr('href')}`;
          const imagen = $(this).next('a');
          const img = `${imagen.find('img').attr('src')}`;
         
        inmuebles.push({title,price,descripcion,img,url});
       // console.log(articles, 'los articulos ');
    });
     res.status(200).json({
        ok: true,
        data: inmuebles,
    });
})
   .catch((err) => {console.log(err);});
};
module.exports= { getRemaxInmuebles };
