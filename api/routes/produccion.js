const router = require('express').Router();
const Orden = require('../models/Orden');
const Materia = require('../models/Materia');


//Crear orden

router.post('/ordenes', async (req, res)=> {
    
    const newOrden = new Orden(req.body);

    try {
        const savedOrden = await newOrden.save();
        res.status(200).json(savedOrden);  
    } catch (err) {
        res.status(500).json(err);
    }
})

// Fetch materias

router.get('/materias', async (req, res) => {
    try {
        const materias = await Materia.find();
        res.status(200).json(materias);
    } catch (err){
        res.status(500).json(err);
    }
});

//Fetch ordenes

router.get('/ordenes', async (req, res) => {
    try {   
        const ordenes = await Orden.find();
        res.status(200).json(ordenes);
    } catch(err) { res.status(500).json(err)}
})




module.exports = router;