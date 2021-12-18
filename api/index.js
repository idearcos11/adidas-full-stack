const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Esta libreria permite hacer http requests desde servidores distintos al propio de la app. 
const inventarioRoute = require('./routes/inventario');
const produccionRoute = require('./routes/produccion');

dotenv.config();
const app = express();
app.use(cors())


mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Conectado a la base de datos'))
        .catch(err => console.log(err)
);

app.use(express.json());
app.use('/api/inventario', inventarioRoute)
app.use('/api/produccion', produccionRoute)



app.listen(process.env.PORT || 5000, () => console.log(`Backend corriendo en el puerto ${process.env.PORT}`));


