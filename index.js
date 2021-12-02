const PORT = process.env.PORT || 5000
const dinosaurs = require('./dinosaurs.json');
const express = require('express')
const app = express()

app.get('/secure/dinosaurs', (req,res) => {
  let apiKey = undefined;
  if (req.header('Authorization')) {
    let split = req.header('Authorization').split(" ");
    if (split.length > 1) {
      if (split[0] === "Bearer") {
        apiKey = split[1];
      }
    }
  } else {
    apiKey = req.query.API_KEY;
  }

  if (apiKey === "ef2a5495fa4c80") {
    res.json(dinosaurs);    
  } else {
    res.status(401).json({error: "Invalid API key"});
  }
});

app.get('/dinosaurs', (req, res) => {
  res.json(dinosaurs);
});

app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
