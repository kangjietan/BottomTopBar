const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://localhost/soundclone',
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected, inserting data with local links to songs');
});

const songSchema = mongoose.Schema({
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
});

const Song = mongoose.model('Song', songSchema);

const fakeData = [];

for (let i = 0; i < 10; i += 1) {
  for (let j = 1; j <= 10; j += 1) {
    fakeData.push({
      title: faker.lorem.word(),
      artist: faker.name.findName(),
      song_url: `./songs/song${j}.mp3`,
      song_image: faker.image.imageUrl(30, 30),
    });
  }
}

Song.insertMany(fakeData);
