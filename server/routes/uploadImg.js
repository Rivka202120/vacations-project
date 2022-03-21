// const { sql } = require('../dbconfig')
// const router = require('express').Router()
// const multer = require("multer");
// const { v4: uuidv4 } = require('uuid');
// const DIR = './uploads/';


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// let upload = multer({
//     storage: storage
//     , fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/pdf") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });


// router.post("/uploadImg/:id", upload.single('file'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     Product.findByIdAndUpdate(req.params.id, {img: url + '/uploads/' + req.file.filename }, { new: true })
//         .then(p => {
//             return res.status(200).send(p)
//         })
//         .catch(err => { return res.status(400).send(err.message) })
// })


// module.exports = router