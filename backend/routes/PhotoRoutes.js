const express = require('express')
const router = express.Router()

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById
} = require('../controllers/PhotoController')

const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidations')

const { photoInsertValidation } = require('../middlewares/photoValidation')
const { imageUpload } = require('../middlewares/imageUpload')

router.post(
  '/',
  authGuard,
  imageUpload.single('image'),
  photoInsertValidation(),
  validate,
  insertPhoto
)

router.delete('/:id', authGuard, deletePhoto)
router.get('/', authGuard, getAllPhotos)
router.get('/user/:id', authGuard, getUserPhotos)
router.get('/:id', authGuard, getPhotoById)

module.exports = router
