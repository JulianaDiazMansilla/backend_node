'use strict';


const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: { type: String, unique: true},
    venta: { type: Boolean, index: true},
    precio: { type: Number, index: true },
    foto: {type: String},
    tags: {type: [String], index: true }
})

anuncioSchema.statics.allowedTags = function () {
    return ['work', 'lifestyle', 'motor', 'mobile'];
  };
  
anuncioSchema.statics.lista = function(filtro, skip, limit, campos, sort) {
    const query = Anuncio.find(filtro); 
    query.skip(skip);
    query.limit(limit);
    query.select(campos);
    query.sort(sort);
    return query.exec() 
  }





const Anuncio = mongoose.model('Anuncios', anuncioSchema);



module.exports = Anuncio;
