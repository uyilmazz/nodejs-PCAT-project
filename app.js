const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Photo = require('./models/Photo');

const app = express();

// Database connect
mongoose.connect('mongodb://localhost/pcat-db',{useNewUrlParser: true,useUnifiedTopology: true});

app.set('view engine','ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',async (req,res) => {

    const photos = await Photo.find();
    res.render('index',{photos});
});

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/addPhoto',(req,res) => {
    res.render('addPhoto');
});

app.post('/photos',async (req,res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Server initialized from ${port} port`);
});