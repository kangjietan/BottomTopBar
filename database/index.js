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
  author: String,
  length: Number,
  song_url: String,
  song_image: String,
});

const Song = mongoose.model('Song', songSchema);

Song.insertMany([{
  title: 'abc',
  author: 'abc',
  length: 123,
  song_url: 'abc',
  song_image: 'abc',
}]);
