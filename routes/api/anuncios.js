'use strict';

const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Anuncio= require('../../models/Anuncios');



// GET 

router.get ('/', async (req, res, next) => {
    try{
        // filtros
        const nombre = req.query.nombre;
        const precio = req.query.precio;
        const venta = req.query.venta;
        const tags = req.query.tags;
        const max = req.query.max;
        const min = req.query.min;

        // paginación
        const skip = req.query.skip;
        const limit = req.query.limit;

        // selección de campos
        const fields = req.query.fields; // /api/preciontes?fields=nombre -_id

        // ordenación
        const sort = req.query.sort; // /api/preciontes?sort=precio%20nombre


        const filtro = {};

        if (nombre) { 
            //filtro.nombre = nombre;
            filtro.nombre = new RegExp('^' + req.query.nombre, 'i');
        }

        if (precio) { 
            filtro.precio = precio;
        }

        if (venta) { 
            filtro.venta = venta;
        }

        if (tags) { 
            filtro.tags = tags;
        }

        if (max && min) {
            filtro.precio = { $gte: min, $lte: max };
        }

        const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
        res.json({ anuncios });
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
  
      const id = req.params.id;
  
      // buscar un anuncio en la BD
      const anuncio = await Anuncio.findById(id);
  
      res.json({ result: anuncio });
  
    } catch (err) {
      next(err);
    }
  });

// PUT

router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        const anuncioData = req.body;

        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: id}, anuncioData, {
        new: true // esto hace que nos devuelva el documento actualizado
        });

        res.json({anuncioActualizado });

    } catch (err) {
        next(err);
    }
    });

// POST 

router.post('/', async (req, res, next) => {
    try {

        const anuncioData = req.body;

        // instanciar un nuevo anuncio en memoria
        const anuncio = new Anuncio(anuncioData);

        // lo guardo en la base de datos
        const anuncioGuardado = await anuncio.save();

        res.json({ anuncioGuardado });

    } catch (err) {
        next(err);
    }
    });

// DELETE 

router.delete('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        const anuncio = await Anuncio.findById(id);

        if (!anuncio) {
        return next(createError(404));
        }

        await Anuncio.deleteOne({ _id: id });

        res.json();

    } catch (err) {
        next(err);
    }
    });

// List of tags on http://localhost:3000/api/anuncios/tags

router.get('/tags', asyncHandler(async function (req, res) {
    const distinctTags = await Anuncio.distinct('tags');
    res.json({ result: distinctTags });
    }));

module.exports = router;