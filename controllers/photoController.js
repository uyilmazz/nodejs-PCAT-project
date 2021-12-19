const Photo = require('../models/Photo');
const fs = require('fs');

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find();
    res.render('index', { photos });
}

const getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
}

const addPhoto = async (req, res) => {

    console.log('add photo inside');
    const uploadFolder = 'public/uploads';

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }

    const uploadedFile = req.files.image;
    const uploadFilePath = __dirname + '/../public/uploads/' + uploadedFile.name;

    uploadedFile.mv(uploadFilePath, async () => {
        await Photo.create(
            {
                ...req.body,
                image: 'uploads/' + uploadedFile.name
            }
        );
    });
    res.redirect('/');
}

const deletePhoto = async(req,res) => {
    const photo = await Photo.findById(req.params.id);

    if(photo){
        const photoPath = __dirname + '/../public/' + photo.image;
        if(fs.existsSync(photoPath)){
            fs.unlinkSync(photoPath);
        } 
        await Photo.findByIdAndDelete(req.params.id);
    }

    res.redirect('/');
}

const updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    if (photo) {
        await Photo.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description });
        res.redirect(`/photos/${req.params.id}`);
    } else {
        res.redirect('/');
    }
}

module.exports = {
    getAllPhotos,
    getPhoto,
    addPhoto,
    deletePhoto,
    updatePhoto,
}