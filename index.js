const PORT = process.env.PORT || 5000
const dinosaurs = require('./dinosaurs.json');
const express = require('express')
const app = express()

app.get('/secure/dinosaurs', (req,res) => {
  let apiKey = undefined;
  if (req.header('Authorization')) {
    apiKey = req.header('Authorization');
  } else {
    apiKey = req.query.API_KEY;
  }

  if (apiKey === "ef2a5495fa4c80") {
    res.json(dinosaurs);    
  } else {
    res.json({error: "Invalid API key"}, 401);
  }
});

app.get('/dinosaurs', (req, res) => {
  res.json(dinosaurs);
});

app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
