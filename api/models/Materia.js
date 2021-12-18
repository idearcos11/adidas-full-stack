const mongoose = require('mongoose');


const MateriaSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        desc: {type: String},
        size: {type: String},
        amount: {type: Number, required: true},
        price: {type: Number, required: true},
        sold: {type: Number, default: 0}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Materia', MateriaSchema); // default export
module.exports.MateriaSchema = MateriaSchema;
