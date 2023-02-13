const axios = require('axios');
const cherrio = require('cheerio');

const getultracasaInmuebles =  (req, res ,next) => {
 let articles = [];
    const url = 'https://www.ultracasas.com/buscar/casa-en-alquiler--en--la-paz---la-paz?page=1';

axios(url).then((response)=> {
    const html = response.data;
    const $ = cherrio.load(html);
    $=cheerio.load(html);
    $('',html).each(function () {
    })

});



    res.status(200).json({
        ok:true,
        data: 'Hola desde ultracasa',
});
};

module.exports = {getultracasaInmuebles};
