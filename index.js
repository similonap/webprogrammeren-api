const PORT = process.env.PORT || 5000
const dinosaurs = require('./dinosaurs.json');
const express = require('express')
const app = express()

app.get('/secure/dinosaurs', (req,res) => {
  checkKey(req, res, handleDinosaurs);
});

app.get('/secure/dinosaur/:id', (req,res) => {
  checkKey(req, res, handleDinosaur);
});

app.get('/dinosaurs', (req, res) => {
  handleDinosaurs(req, res);
});

app.get('dinosaurs/:id', (req, res) => {
  handleDinosaur(req,res);
});

function checkKey(req, res, next) {
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
    next(req, res);  
  } else {
    res.status(401).json({error: "Invalid API key"});
  }
}

function handleDinosaurs(req, res) {
  res.json(dinosaurs);
}

function handleDinosaur(req, res) {
  let id = req.params.id;
  let found = dinosaurs.find(dinosaur => dinosaur.id === id);
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({error: "Dinosaur not found"});
  }
}



app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
