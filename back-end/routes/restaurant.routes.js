const express = require('express')
const restaurantController = require('../controllers/restaurantController')
const uploadController = require('../controllers/uploadController')
const router = express.Router()

// upload file
const multer = require('multer')
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const uploadPath = "../front-end/public/uploads/restaurant"
var storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, Math.random() + "-" + file.originalname)
    },
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})
const upload = multer({storage: storage})

router.get('/', restaurantController.index)

router.post('/create', [ upload.single('image'), restaurantController.validate('create')], restaurantController.create)

router.post('/upload', upload.single('image'),  uploadController.uploadImageRestaurant)
router.get('/:id', restaurantController.getRestaurantById)

router.post('/review/:id', restaurantController.createReview)

module.exports = router