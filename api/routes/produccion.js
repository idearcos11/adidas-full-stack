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
        const query = req.query;
        const ordenes = await Orden.find();
        res.status(200).json(ordenes);
    } catch(err) { res.status(500).json(err)}
})

router.get('/ordenes/buscar/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const ordenes = await Orden.find({'titulo': {$regex: new RegExp(query, 'i')}});
        res.status(200).json(ordenes);
    } catch(err) { res.status(500).json(err)}
})

//Fetch orden

router.get('/ordenes/orden/:ordenId', async (req, res) => {
    try {
        const ordenId = req.params.ordenId;
        const orden = await Orden.findById(ordenId);
        res.status(200).json(orden);
    } catch(err) { res.status(500).json(err)}
})


//Fetch ordenes por despachar

router.get('/ordenes/por-despachar', async (req, res) => {
    try {   
        const ordenes = await Orden.find({'status':'Pendiente'});
        res.status(200).json(ordenes);
    } catch(err) { res.status(500).json(err)}
})

router.get('/ordenes/por-despachar/buscar/:query', async (req, res) => {
    const query = req.params.query;
    try{
    const ordenes = await Orden.find({'titulo': {$regex: new RegExp(query, 'i')}, 'status':'Pendiente'});
    res.status(200).json(ordenes);
    } catch (err) { res.status(500).json(err)}
})



//Fetch ordenes despachadas

router.get('/ordenes/despachado', async (req, res) => {
    try {   
        const ordenes = await Orden.find({'status':'Despachado'});
        res.status(200).json(ordenes);
    } catch(err) { res.status(500).json(err)}
})

router.get('/ordenes/despachado/buscar/:query', async (req, res) => {
    const query = req.params.query;
    try{
    const ordenes = await Orden.find({'titulo': {$regex: new RegExp(query, 'i')}, 'status':'Despachado'});
    res.status(200).json(ordenes);
    } catch (err) { res.status(500).json(err)}
})

router.delete('/ordenes/orden/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await Orden.findByIdAndDelete(id);
        res.status(200).json('Orden eliminada exitosamente');
    } catch (err) { res.status(500).json(err)}
})

// Actualizar orden

router.put('/ordenes/:id', async (req, res) => {
    try {
        const updatedOrden = await Orden.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedOrden);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;