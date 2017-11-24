function authenticate(req, res, next) {
  const userId = req.headers.authorization;

  if (userId) {
    req.body.userId = userId;
    return next();
  }

  res.status(401).end();
}

function changeSong(userId, newSong, songQueue) {
  for (let song of songQueue) {
    if (song.userId = userId) {
      song.url = newSong.url;
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
    name: data.name,
    url: data.url,
    userId: data.userId,
    userName: data.userName
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
