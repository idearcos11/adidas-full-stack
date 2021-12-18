const mongoose = require('mongoose');
const Materia = require('./Materia');

const OrdenSchema = new mongoose.Schema(
    {
        titulo: {type: String},
        desc: String,
        productos: [{
            producto: Materia.MateriaSchema,
            cantidad: Number
        }],
        status:{
            type:String,
            default: 'Pendiente'
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Orden', OrdenSchema);
