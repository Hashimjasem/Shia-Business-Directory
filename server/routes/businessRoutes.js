const express = require('express')
const router = express.Router()
const businessController = require('../controllers/businessController')

router.route('/')
    .get(businessController.getAllBusinesses)
    .post(businessController.createNewBusiness)
    .patch(businessController.updateBusiness)
    .delete(businessController.deleteBusiness)

module.exports = router