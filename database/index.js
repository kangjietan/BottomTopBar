const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soundclone',
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

const songSchema = mongoose.Schema({
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
});

const Song = mongoose.model('Song', songSchema);

const getInitial = (cb) => {
  Song.find({}, null, { limit: 100 }, (error, docs) => {
    if (error) {
      console.log(error);
    } else {
      cb(docs);
    }
  });
};

module.exports.getInitial = getInitial;
