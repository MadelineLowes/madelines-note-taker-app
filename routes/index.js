const express = require('express');
const app = express();

// Import our modular router for /notes
const notesRouter = require('./notes');

app.use('/notes', notesRouter);

module.exports = app;
