const router = require('express').Router();
const Materia = require('../models/Materia');


//Crear materia

router.post('/materias', async (req, res) =>{

    const newMateria = new Materia(req.body); // con el req.body se hace destructuring y se asignan automateicamente los valores con las keys que coincidan
    try {
        const savedMateria = await newMateria.save();
        res.status(200).json(savedMateria);  
    } catch (err) {
        res.status(500).json(err)
    }
    
});

//Editar materia

router.put('/materias/:id', async (req, res) => {
    try {
        const updatedMateria = await Materia.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedMateria);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Editar solo un campo

router.patch('/materias/:id', async (req, res) => {
    try {
        const updatedMateria = await Materia.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedMateria);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Mostrar todas las materias

router.get('/materias', async (req, res) => {
    try {
        const materias = await Materia.find();
        res.status(200).json(materias);
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/materias/buscar/:query', async (req, res) => {
    const query = req.params.query;
    try {
        const materias = await Materia.find({'name': {$regex: new RegExp(query, 'i')}});
        res.status(200).json(materias);
    } catch (err){
        res.status(500).json(err);
    }
});

//Mostrar una materia

router.get('/materias/:id', async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        res.status(200).json(materia);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Eliminar una materia

router.delete('/materias/:id', async (req, res)=> {
    try {
        await Materia.findByIdAndDelete(req.params.id);
        res.status(200).json("Materia eliminada");
    } catch (err) {
        res.status(500).json(err);
    }

});






module.exports = router;






