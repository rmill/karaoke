"use strict"

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const {authenticate, changeSong, deleteSong, songExists, getSong} = require('./lib');
const app = express()

app.use(cors());
app.use(bodyParser.json());

const songQueue = [];

app.post('/next', (req, res) => {
  songQueue.shift();
  res.end(JSON.stringify(songQueue));
});

app.get('/songs', (req, res) => {
  res.end(JSON.stringify(songQueue));
})

app.post('/song', authenticate, (req, res) => {
  // A user may only have one song
  if (!req.body.isHost && songExists(req.body.userId, songQueue)) return res.status(409).end();

  // Add the song to the queue
  songQueue.push(getSong(req.body, songQueue));
  res.end();
});

app.put('/song', authenticate, (req, res) => {
  // Song must exist to change
  if (!req.body.isHost && !songExists(req.body.userId, songQueue)) return res.status(404).end();

  // Change the user's song
  changeSong(req.body.userId, req.body, songQueue);
  res.end(JSON.stringify(songQueue));
});

app.delete('/song', authenticate, (req, res) => {
  // Song must exist to delete
  if (!req.body.isHost && !songExists(req.body.userId, songQueue)) return res.status(404).end();

  // Delete the song
  deleteSong(req.body.userId, songQueue);
  res.end(JSON.stringify(songQueue));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
