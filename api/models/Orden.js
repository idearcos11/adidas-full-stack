const mongoose = require('mongoose');
const Materia = require('./Materia');

const OrdenSchema = new mongoose.Schema(
    {
        titulo: {type: String},
        desc: String,
        productos: [{
            producto: Materia.MateriaSchema,
            cantidad: Number
        }]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Orden', OrdenSchema);
