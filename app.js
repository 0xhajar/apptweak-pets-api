const express = require('express');
const logger = require('morgan');

const ownersRouter = require('./routes/owners');
const petsRouter = require('./routes/pets');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/owners', ownersRouter);
app.use('/pets', petsRouter);

module.exports = app;