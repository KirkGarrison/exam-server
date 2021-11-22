const axios = require('axios');
const Char = require('./charModel.js')

async function handleGetSeed(req, res) {
  try {
    const characters = await axios.get('https://swapi.dev/api/people/');
    let characterArray = characters.data.results.map(char => new Character(char));
    characterArray.forEach(character => seedDatabase(character));
    res.status(200).send('success');
  } catch (e) {
    res.status(500).send('server error');
  }
}

async function seedDatabase(character) {
  const char = await Char.create(character)
}

class Character {
  constructor(obj) {
    this.name = obj.name;
    this.height = obj.height;
    this.birth_year = obj.birth_year;
    this.hair_color = obj.hair_color;
    this.eye_color = obj.eye_color;
    this.notes = '';
  }

}

module.exports = handleGetSeed;