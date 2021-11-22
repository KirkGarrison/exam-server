'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Char = require('./charModel.js')
const handleGetSeed = require('./handleSeed.js');

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});


const PORT = process.env.PORT || 3001;

app.get('/seed', handleGetSeed);
// app.get('/characters', handleGetCharacters)
// app.post('/characters', handlePostCharacters)
// app.delete('/characters/:id', handleDeleteCharacters)
// app.put('/characters/:id', handlePutCharacters)


// to seed your database hit the route /seed, you will get a success message back and your database will now have a small collection of characters in it you can use as a base





app.listen(PORT, () => console.log(`listening on ${PORT}`));