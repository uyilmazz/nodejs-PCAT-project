const Photo = require('../models/Photo');
const fs = require('fs');

const getAllPhotos = async (req, res) => {

    //console.log(req.query.page);
    const page = req.query.page || 1;
    const totalPhoto = await Photo.find().countDocuments();
    const photosPerPage = 2; 

    const photos = await Photo.find()
    //.sort('-createdAt')
    .skip((page -1 ) * photosPerPage)
    .limit(photosPerPage);

    res.render('index', { 
        photos,
        currentPage : page,
        totalPage: Math.ceil(totalPhoto / photosPerPage)
    });
}

const getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
}

const addPhoto = async (req, res) => {

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