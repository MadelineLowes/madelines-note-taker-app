const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
// const { Console } = require('console');
const { readFile, writeFile } = fs.promises;

// API ROUTES
// GET route for all notes
router.get('/', (req, res) => {
  readFile("db/notes.json").then((data) => {
    res.send(data);
  })
});

// GET Route for a specific note
router.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// POST route for new note
router.post('/', (req, res) => {
  const newNote = req.body
  newNote.id = uuidv4()

  readFile("db/notes.json").then(data => {
    const parsedData = JSON.parse(data)
    parsedData.push(newNote)
    return writeFile("db/notes.json", JSON.stringify(parsedData))
  }).then(data => {
    const response = {
      status: 'success',
      body: data,
    };
    res.json(response);
  }).catch(error => {
    res.json('Error in posting note');
  })
})

// DELETE route for specific note
router.delete('/:id', (req, res) => {
  readFile("db/notes.json").then(data => {
    const parsedData = JSON.parse(data)
    for (var i = 0; i < parsedData.length; i++) {
      if ((`/` + parsedData[i].id) === req.url) {
        parsedData.splice(i, 1);
      }
    }
    return writeFile("db/notes.json", JSON.stringify(parsedData))
  }).then(data => {
    const response = {
      status: 'success',
      body: data,
    };

    res.json(response);
  }).catch(error => {
    res.json('Could note find note with that ID');
  })
});

module.exports = router;
