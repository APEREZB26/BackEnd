const express = require("express");
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use((request,response,next)=>{
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('--------')
  next();
})

let country = [
  {
    id: 1,
    content: "Contenido 1",
    date: new Date(),
  },
  {
    id: 2,
    content: "Contenido 2",
    date: new Date(),
  },
  {
    id: 3,
    content: "Contenido 3",
    date: new Date(),
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

app.get("/api/country", (req, res) => {
  res.json(country);
});

app.get("/api/country/:id", (req, res) => {
  const id = Number(req.params.id);
  const countrys = country.find((country) => country.id === id);

  if (countrys) {
    res.json(countrys);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/country/:id", (req, res) => {
  const id = Number(req.params.id);
  country = country.filter((country) => country.id !== id);
  res.status(204).end();
});

app.post("/api/country", (req, res) => {
  const countrys = req.body;
  const ids = country.map((country) => country.id);
  const maxId = Math.max(...ids);
  const newCountry = {
    id: maxId + 1,
    content: countrys.content,
    date: new Date(),
    nationality: countrys.nationality
  };

  country = country.concat(newCountry);

  res.json(newCountry);
});

//CONTROLADOR DE ERROR 404

app.use((request,response)=>{
  response.status(404).json({
    error: 'Página no encontrada'
  })
})

app.listen(PORT);
console.log(`Servidor en el Puerto ${PORT}`);
