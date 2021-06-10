const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    cel: String,
    correo: String,
    contrasena: String
});


module.exports = mongoose.model('usuario', UsuariosSchema);
