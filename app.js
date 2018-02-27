const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path=require('path');

const app = express();

//db config + 
//'mongodb://nirvik:root@ds249428.mlab.com:49428/dbl07';
const mongoURI='mongodb://localhost/dbl07';
//CONNECT TO remote database
mongoose.Promise=global.Promise;
mongoose.connect(mongoURI)
.then(() => console.log('mongodb connected...'))
.catch(err => console.log(err));

//load the model
require('./models/Geometry');
const Geometry=mongoose.model('geo');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//middleware 
//express-handlebars
app.engine('handlebars', exphbs({
  defaultLayout:'main'
  }));
  app.set('view engine','handlebars')

//body-parser middleware
app.set('view engine', 'handlebars');
// body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//app route to index.html -> display on 3.js
app.get('/', (req, res) =>{
  Geometry.find({})
  .then(geometry=>{
    res.render('index', {
      geometry:geometry
    });  
  });  
});

//posted number is displayed in index
//edit idea form
app.get('/geometry/show/:id', (req, res)=>{
  Geometry.findOne({
    _id:req.params.id
  })
  .then(geo => {
    res.render('geometry/show',{geo : geo})
  })
});


app.get('/about', (req, res)=>{
  res.render('about');
});

port=3030;
app.listen(port, ()=>{
  console.log(`server started on ${port}`);
});