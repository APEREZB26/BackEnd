require("dotenv").config();
require("./dbMongoConnect");

const express = require("express");
const app = express();
const path = require('path')
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const Country = require("./Models/Country.js");

app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
  console.log(request.method);
  console.log(request.path);
  console.log(request.body);
  console.log("--------");
  next();
});

let country = [];

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'portada.html'));
});

app.get("/api/country", (req, res) => {
  Country.find({}).then((countries) => {
    res.json(countries);
  });
});

app.put("/api/country/:id", (req, res ,next) => {
  const countrys = req.body;
  const {id} = req.params;
  
  const newCountryInfo =  {
    content: countrys.content,
    nationality: countrys.nationality,
  }
  Country.findByIdAndUpdate(id, newCountryInfo, {new : true})
  .then(result=>{
    res.json(result)
  })
});

app.get("/api/country/:id", (req, res, next) => {
  const { id } = req.params
  Country.findById(id).then((country) => {
    if (country) {
      return res.json(country);
    } else {
      res.status(404).end();
    }
  }).catch(err=>{
    next(err)
  })
});

app.delete("/api/country/:id", (req, res, next) => {
  const {id} = req.params;

  Country.findByIdAndRemove(id).then(result =>{
    res.status(204).end();
  }).catch(err=>{
    next(err);
  })
});

app.post("/api/country", (req, res, next) => {
  const countrys = req.body;
  const newCountry = new Country({
    content: countrys.content,
    date: new Date(),
    nationality: countrys.nationality,
  });

  newCountry.save().then((savedCountry) => {
    res.json(savedCountry)
  });

  next();
});

//CONTROLADOR DE ERROR 404

app.use((error, request, response, next) => {
  response.status(404).end()
});

app.use((error, request, response, next) => {
  console.log(error.name)
  if(error.name === 'CastError'){
    response.status(400).end()
  }else{
    response.status(500).end()
  }
});

app.listen(PORT);
console.log(`Servidor en el Puerto ${PORT}`);
