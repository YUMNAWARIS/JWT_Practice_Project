const express = require('express');
const mongoose = require('mongoose');
const auth_routes = require('./routers/auth')
const {auth,currentUser} = require("./MiddleWare/auth");
const cookieParser = require('cookie-parser');

const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://root:root@cluster0.kq3nyka.mongodb.net/node_jwt';
mongoose.connect(dbURI)
  .then(
    (result) =>{ 
      app.listen(3001)
    })
  .catch((err) => console.log(err));

// routes
app.get('*' , currentUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', auth,(req, res) => res.render('smoothies'));
app.use('/auth', auth_routes);