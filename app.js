const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');


app.set('view engine','ejs');

// Middleware
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.render('index');
});

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/addPhoto',(req,res) => {
    res.render('addPhoto');
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Server initialized from ${port} port`);
});