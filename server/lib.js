function authenticate(req, res, next) {
  const auth = req.headers.authorization;

  if (auth) {
    const user = JSON.parse(auth);
    req.body.userId = user.token;
    req.body.isHost = user.isHost;
    return next();
  }

  res.status(401).end();
}

function changeSong(userId, newSong, songQueue) {
  for (let song of songQueue) {
    if (song.userId = userId) {
      song.id = newSong.id;
      song.name = newSong.name;
    }
  }
}

function deleteSong(userId, songQueue) {
  for (let i of songQueue.keys()) {
    if (songQueue[i].userId === userId) songQueue.splice(i, 1);
  }
}

function getSong(data) {
  return {
    id: 'add-id-here',
    name: data.name,
    thumbnail: data.thumbnail,
    userId: data.userId,
    videoId: data.videoId,
  };
}

function songExists(userId, songQueue) {
  for (let song of songQueue) {
    if (song.userId === userId) return true;
  }

  return false;
}

module.exports.authenticate = authenticate;
module.exports.changeSong = changeSong;
module.exports.deleteSong = deleteSong;
module.exports.getSong = getSong;
module.exports.songExists = songExists;
