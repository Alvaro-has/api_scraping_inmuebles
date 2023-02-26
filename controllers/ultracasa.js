
const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getInmuebles = (req, res, next) => {
    let inmuebles= [];
   //const url = 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz';
   const url = 'https://www.ultracasas.com/';
  
   
    axios(url).then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        $('.inmuebles-item-titular-tit',html).each(function () { //lc-dataWrapper
        //con-main-content-info padding-othest title = $(this).text(); //para solo obtener el texto
          const text = $(this).find('h3'); 
          
          //const url= 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz'+ $(this).find('a').attr('href');
        
          //const descripcion = $(this).find('p').text();
          const location = text.text();
          const precio = $(this).find('.label-destaca').text();
          const title=$(this).find('h2').text();
          const url= $(this).find('a').attr('href');

         inmuebles.push({title,location,precio,url});
    //sin esto no se imprime en consola que es lo que se esta obteniendo
        //inmuebles.push({title});
       // console.log(articles, 'los articulos ');
    });
     res.status(200).json({
        ok: true,
        data: inmuebles,
    });
})
   .catch((err) => {console.log(err);});
};


module.exports={getInmuebles};


