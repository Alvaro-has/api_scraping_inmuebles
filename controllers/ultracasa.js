
const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getInmuebles = async (req, res, next) => {
    let inmuebles= [];
   //const url = 'https://www.infocasas.com.bo/alquiler/inmuebles/la-paz';
   const baseUrl = 'https://www.ultracasas.com/buscar/departamento-en-alquiler--en--la-paz---la-paz?page=1';
  
   
   // axios(url).then((response) => {
       // const html = response.data;
       // const $ = cheerio.load(html);
//  for que recora para tres paginas
    for (let i = 1; i <= 5; i++) {
        const url = baseUrl + i;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

       // $('.inmuebles-item-titular-tit',html).each(function () { //lc-dataWrapper
       $('.inmuebles-item-titular-tit',html).each(function () { 
         const text = $(this).find('h3'); 
         const descripcion=$(this).find('p').text();
         const location = text.text();
          const price = $(this).find('.inmuebles-item-precio').text();
          const title=$(this).find('h2').text();
          const url= $(this).find('a').attr('href');
          const img = $(this).find('').attr('src');
          

         // const imgUrl = $('img[src^="https://cdn7.ultracasas.com/dyn/yastaimages"]').attr('src');

          const imgUrl = $(this).find('img.adapt-image.object-fit-rev').attr('src');

        
          
        //const imgUrl =$(' img.adapt-image.object-fit-rev').attr('src');

          //console.log(imgUrl);
          

         inmuebles.push({title,descripcion,location,price,url,img});
         // ;
          //console.log(img);
    });
     
}
res.status(200).json({
  ok: true,
  data: inmuebles,
});
};


module.exports={getInmuebles};




/*const axios = require('axios'); // realizar peticiones para hacer llamadas  http 
const cheerio = require('cheerio');  //leer y obtener la data html 
const express = require('express');

const getInmuebles = async (req, res, next) => {
  let antiInmuebles = [];

  const baseURL = 'https://www.infocasas.com.bo';
  const url = `${baseURL}/anticretico/inmuebles/la-paz`;

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const imageUrl = $(".card-image-gallery img")
    .map(function () {
      return $(this).attr("src");
    })
    .get();

  $('.lc-dataWrapper', html).each(function (index) {
    const text = $(this).find('h4');
    const inmueble = {
      title: text.text(),
      url: `${baseURL}${$(this).find('a').attr('href')}`,
      descripcion: $(this).find('p').text(),
      price: $(this).find('.lc-price').text(),
      location: $(this).find('.lc-location').text(),
      Dorm_Baños: $(this).find('.lc-typologyTag').text(),
      img: imageUrl[index],
    };

    antiInmuebles.push(inmueble);
  });

  let inmuebles = [];
  const baseUrl = 'https://www.ultracasas.com/buscar/casa-en-alquiler--en--la-paz---la-paz?page=';

  for (let i = 1; i <= 5; i++) {
    const url = baseUrl + i;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $('.inmuebles-item-titular-tit', html).each(function () {
      const text = $(this).find('h3');
      const descripcion = $(this).find('p').text();
      const location = text.text();
      const price = $(this).find('.inmuebles-item-precio').text();
      const title = $(this).find('h2').text();
      const url = $(this).find('a').attr('href');
      const img = $(this).find('img').attr('src');

      inmuebles.push({ title, descripcion, location, price, url, img });
    });
  }

  // Combina los dos arreglos en uno solo
  const todosLosInmuebles = [...antiInmuebles, ...inmuebles];

  // Devuelve la respuesta con todos los inmuebles
  res.send(todosLosInmuebles);
};

module.exports= {getInmuebles};
*/