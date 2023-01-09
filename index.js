const express = require('express');
const request = require('request');
const app = express();

const mongoose = require('mongoose');
//Configuração da conexão com o cluster do MongoDB
const MONGODB_DSN = 'mongodb+srv://fffgoveia:fireblade1@cluster0.c8szhpm.mongodb.net/?retryWrites=true&w=majority';

app.get('/log', async (req, res) => {
  const promise = mongoose.connect(MONGODB_DSN)
  // Cria o schema que mapeia mongodb para o JS
  const artigoSchema = new mongoose.Schema({
    data_hora: String,
    car_id: String,
  })

  // 'Artigo' vai ser tratado como uma classe de agora em diante
  const Artigo = mongoose.model('artigos', artigoSchema)

  // Criamos uma instância de Artigo
  const tutorial_mongodb = new Artigo({
    data_hora: data_hora,
    car_id: car_id,
  })

  // Salvar o registro no MongoDB
  await tutorial_mongodb.save()

  await mongoose.connection.close()
  res.send();
  // Consultar todos registros na tabela log
  const collection = Artigo.db("test").collection("log");
  collection.find({}).toArray((error, documents) => {
    console.log(documents);
    Artigo.close();
  });

});
app.use(express.json());
// Implementar os dados da api externa do endpoint GET api/cars
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
// Criar um registro na api externa (POST api/cars ) usando a api implementada
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
// exibir serviço 1
app.listen(3000, () => {
  console.log('API listening on port 3000');
});



