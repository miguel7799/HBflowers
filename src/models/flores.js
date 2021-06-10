const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FloresSchema = new Schema({
    nombre: String,
    imagen: String,
    descripcion: String,
    disponibilidad: Number,
    precio: Number
});


module.exports = mongoose.model('flores', FloresSchema);
