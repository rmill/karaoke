"use strict"

const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json());

const songQueue = [];

app.get('/songs', (req, res) => {
  res.end(JSON.stringify(songQueue));
})

app.post('/song', (req, res) => {
  const userId = req.headers.authorization;

  if (!userId) {
    res.status(401).end();
    return;
  }

  if (hasSong(userId)) {
    res.status(409).end();
    return;
  }

  const song = {
    name: req.body.name,
    url: req.body.url,
    userId,
    userName: req.body.user
  };

  songQueue.push(song);
  res.end();
  console.log('Song added', songQueue);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

function hasSong(userId) {
  for (let song of songQueue) {
    if (song.userId === userId) return true;
  }

  return false;
}
