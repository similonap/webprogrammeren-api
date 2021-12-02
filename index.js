const PORT = process.env.PORT || 5000
const dinosaurs = require('./dinosaurs.json');
const express = require('express')
const app = express()

app.get('/dinosaurs', (req, res) => {
  res.json(dinosaurs);
})

app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
