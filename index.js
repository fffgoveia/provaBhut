const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());

app.get('/api/listCars', (req, res) => {
  request('http://api-test.bhut.com.br:3000/api/cars', (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(body)
      console.log(response)
      res.send(JSON.parse(body));
    }
  });
});

app.post("/api/createCar", (req, res) => {
  const {title, brand, price, age } = req.body;

  const project = {
    "title": title,
    "brand": brand,
    "price": price,
    "age": age
  }
  request(project, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  return res.json(project);
  
});


app.listen(3000, () => {
  console.log('API listening on port 3000');
});


