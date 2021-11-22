const mongoose = require('mongoose');
const { Schema } = mongoose;

const charSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  height: String,
  birth_year:   String,
  hair_color: String,
  eye_color: String,
  notes: String,
});

const CharModel = mongoose.model('Character', charSchema);

module.exports = CharModel;
