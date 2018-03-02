const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();

var db

// MongoDB Connection URL
var url = 'mongodb://localhost:27017/mongocodeclub';

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))    


app.get('/', (req, res) => {
  db.collection('got').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/add', (req, res) => {
	db.collection('got').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('mongocodeclub')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})