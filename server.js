'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Char = require('./charModel.js')
const handleGetSeed = require('./handleSeed.js');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});


const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());


app.get('/seed', handleGetSeed);
app.get('/characters', getCharacters);
app.post('/characters', handlePostCharacter);
app.delete('/characters/:id', handleDeleteCharacter);
app.put('/characters/:id', handlePutCharacter);


async function getCharacters(req, res) {
  try {
    const getDBCharacters = await Char.find({});
    if (getDBCharacters) {
      res.status(200).send(getDBCharacters);
    } else {
      console.log(error);
      res.status(404).send('No Characters');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

async function handlePostCharacter(req, res) {
  try {
    let successCharacter = await Char.create(req.body);
    if (successCharacter) {
      res.status(200).send(successCharacter);
    } else {
      res.status(404).send('No Character');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('server error')
  }
}

async function handleDeleteCharacter(req, res) {

  const id = req.params.id

  try {
    const deletedChar = await Char.findByIdAndDelete(id);
    if (deletedChar) {
      res.status(200).send('Character Deleted')
    } else {
      res.status(400).send('No Character');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('server error')
  }
}

async function handlePutCharacter(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedCharacter = await Char.findByIdAndUpdate(id, updatedData, { new: true, overwrite: true });
    if (updatedCharacter) {
      res.status(200).send(updatedCharacter)
    } else {
      res.status(404).send('No Character was found');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('server error');
  }
}



// to seed your database hit the route /seed, you will get a success message back and your database will now have a small collection of characters in it you can use as a base

// TODO: use the routes above to create handlers that will create, read, update, and delete from your database





app.listen(PORT, () => console.log(`listening on ${PORT}`));