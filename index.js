const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
// midleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gd6px.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    await client.connect();
    const todocollection = client.db('TodoApp').collection('tododata');
    app.get('/todo', async(req,res)=>{
      const email =  req.query.email
      const qurey = {email: email}
      const todolist = await todocollection.find(qurey).toArray()
      res.send(todolist)
 
    })
    app.get('/complete', async(req,res)=>{
      const email =  req.query.email
      const qurey = {email: email}
      const todolist = await todocollection.find(qurey).toArray()
      res.send(todolist)
 
    })
    app.post('/todos', async(req,res)=>{
      const tool = req.body 
      const result = await todocollection.insertOne(tool)
      res.send(result)
    })
  }
  finally{

  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('todo app')
  })
  
  app.listen(port, () => {
    console.log('todo app  server', port)
  })
