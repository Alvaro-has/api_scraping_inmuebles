require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const testRoute = require('./routes/ruta');
const infocasaRoute= require('./routes/infocasaRoutes');
const ultracasaRoute= require('./routes/ultracasaRoutes');
const centuryRoute= require('./routes/century');
const remaxRoute= require('./routes/remax');
app.use(cors());
app.use('/api/', testRoute);
app.use('/api/infocasa', infocasaRoute);
app.use('/api/ultracasa', ultracasaRoute);
app.use('/api/century', centuryRoute);
app.use('/api/remax', remaxRoute);
app.listen(process.env.PORT, () => console.log (`Server started on port: ${process.env.PORT}`));


