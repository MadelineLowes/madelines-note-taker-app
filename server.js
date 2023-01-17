const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');

const api = require('./routes')

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

app.use('/api', api);

// HTML ROUTES
// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(
    path.join(__dirname, '/public/pages/notes.html'))
);

// GET route for home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// app listening to port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);