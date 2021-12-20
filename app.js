const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var methodOverride = require('method-override')
const ejs = require('ejs');


const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');
const app = express();

// Database connect
mongoose.connect('mongodb+srv://uyilmaz:password123456@cluster0.q31tv.mongodb.net/pcat-application?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(_ => console.log('DB CONNECTED'))
    .catch(err => ('DB CONNECTED ERROR' + err));

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: [
        'POST', 'GET'
    ]
}))

app.get('/', photoController.getAllPhotos);

app.get('/about', pageController.getAboutPage);

app.get('/photos/:id', photoController.getPhoto);

app.get('/addPhoto', pageController.getAddPhotoPage);

app.get('/photos/edit/:id', pageController.getEditPage);

app.post('/photos', photoController.addPhoto);

app.put('/photos/edit/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server initialized from ${port} port`);
});