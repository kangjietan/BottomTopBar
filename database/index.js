const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

var Schema = mongoose.Schema;
var songSchema = new Schema({
  title: String,
  author, String,
  length: Number,
  song_url: String,
  song_image: String
});
