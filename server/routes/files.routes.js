const express = require('express');
const router = express.Router();

const uploader = require('../configs/cloudinary.config');

router.post('/upload', uploader.array("images"), (req, res, next) => {




    if (!req.files) {
        next(new Error('No file uploaded!'));
        return;
    }

    const uploadFilesURLs = []
    req.files.map(elm => uploadFilesURLs.push(elm.secure_url))
    res.json({ imagesSecureURLs: uploadFilesURLs });
})


module.exports = router;