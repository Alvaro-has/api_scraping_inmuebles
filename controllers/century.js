const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getCenturyInmuebles = (req, res, next) => {
    let inmuebles= [];
   // https://bolivia.bienesonline.com/
    const url ='https://bolivia.bienesonline.com/departamentos/alquiler/la-paz';
   
    axios(url).then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        $('.item',html).each(function () { 
          const text = $(this).find('strong'); //h4
          //const url= 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz'+ $(this).find('a').attr('href');
          const Img= $(this).find('img').attr('src');
          const Descripcion= $(this).find('p').text();
          const Titulo = text.text();
          const Precio = $(this).find('span').text();
          const Dorm=$(this).find('p.feat').text();
          const url= $(this).find('a').attr('href');
          inmuebles.push({Img,Titulo,Descripcion,Precio,Dorm,url});
        //console.log({Descripcion});
      
    });
     res.status(200).json({
        ok: true,
        data: inmuebles,
    });
})
   .catch((err) => {console.log(err);});
};



module.exports = { getCenturyInmuebles };
