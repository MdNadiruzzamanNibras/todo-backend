const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
// midleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USSER}:${process.env.DB_PASS}@cluster0.gd6px.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("TodoApp").collection("tododata");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
    res.send('todo app')
  })
  
  app.listen(port, () => {
    console.log('todo app  server', port)
  })
