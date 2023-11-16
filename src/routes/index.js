const express = require('express');
const genreRouter = require('./genre.router');
const actorRouter = require('./actor.router');
const movieRouter = require('./movie.router');
const directorRouter = require('./director.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/actors', actorRouter);
router.use('/movies', movieRouter);
router.use('/directors', directorRouter);

module.exports = router;