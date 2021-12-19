const Photo = require('../models/Photo');

const getAboutPage = (req, res) => {
    res.render('about');
}

const getAddPhotoPage = (req, res) => {
    res.render('addPhoto');
}

const getEditPage = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', { photo });
}

module.exports = {
    getAboutPage,
    getAddPhotoPage,
    getEditPage
}