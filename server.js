'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

// const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredData = data.filter(item => item.title.includes(searchTerm));
    res.json(filteredData);
  } 
  else {
    res.json(data);

  }
});
app.get('/api/notes/:id', (req, res) => { 
  const id = (req.params.id);
  const data = req.params.find(params => params.id === Number(id));
  res.json(data);
});


