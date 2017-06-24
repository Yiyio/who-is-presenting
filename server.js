console.log('May Node be with you');

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const path = require('path')

//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


var db

MongoClient.connect('mongodb://db_user:db_user@ds115131.mlab.com:15131/who-is-presenting',
 (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('database listening on port ' + process.env.PORT || 3000)
  })
})


app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  db.collection('presenters').find().toArray((err, result) => {
     if (err) return console.log(err)
     res.render('index.ejs', {presenters: result})
   })
})

app.post('/presenters', (req, res) => {
 db.collection('presenters').save(req.body, (err,result) => {
   if (err) return console.log(err)

   console.log('saved to database')

   res.redirect('/')
 })
})
