const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getCenturyInmuebles = (req, res, next) => {
    let inmuebles= [];
   //const url = 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz';
  // const url = 'https://c21.com.bo/';
    const url ='https://bolivia.bienesonline.com/';
   
    axios(url).then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        $('.items-list',html).each(function () { //lc-dataWrapper
        //con-main-content-info padding-othest title = $(this).text(); //para solo obtener el texto
         // const text = $(this).find('span'); //h4
          //const url= 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz'+ $(this).find('a').attr('href');
          //const url= `${baseURL}${$(this).find('a').attr('href')}`;
          const price= $(this).find('p').text();
          //const title = text.text();
          //const price = $(this).find('.lc-price').text();
          //const location= $(this).find('.lc-location').text();
          //const Dorm_Baños=$(this).find('.lc-typologyTag').text();
        
        inmuebles.push({price});
       // console.log(articles, 'los articulos ');
    });
     res.status(200).json({
        ok: true,
        data: "inmuebles",
    });
})
   .catch((err) => {console.log(err);});
};



module.exports = { getCenturyInmuebles };
