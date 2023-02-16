const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getinfocasaInmuebles = (req, res, next) => {
    let inmuebles= [];
   //const url = 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz';
   const baseURL = 'https://www.infocasas.com.bo';
   const url = `${baseURL}/alquiler/inmuebles/la-paz`;
   
    axios(url).then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        $('.lc-dataWrapper',html).each(function () { //lc-dataWrapper
        //con-main-content-info padding-othest title = $(this).text(); //para solo obtener el texto
          const text = $(this).find('h4'); //h4
          //const url= 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz'+ $(this).find('a').attr('href');
          const url= `${baseURL}${$(this).find('a').attr('href')}`;
          const descripcion = $(this).find('p').text();
          const title = text.text();
          const price = $(this).find('.lc-price').text();
          const location= $(this).find('.lc-location').text();
          const Dorm_Baños=$(this).find('.lc-typologyTag').text();
          const imageWrapper = $(this).next('.gallery-image');
          const img = `${baseURL}${imageWrapper.find('img').attr('src')}`;
        //console.log({title,url});//sin esto no se imprime en consola que es lo que se esta obteniendo
        inmuebles.push({title,img,descripcion,url,price,location,Dorm_Baños});
       // console.log(articles, 'los articulos ');
    });
     res.status(200).json({
        ok: true,
        data: inmuebles,
    });
})
   .catch((err) => {console.log(err);});
};

module.exports= {getinfocasaInmuebles};
