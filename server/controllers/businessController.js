const Business = require('../models/Business')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllBusinesses = asyncHandler(async (req, res) => {
    const businesses = await Business.find().select('-password').lean()
    if (!businesses) {
        return res.status(400).json({ message: 'No businesses Found'})
    }
    res.json(businesses)
})


const createNewBusiness = asyncHandler(async (req, res) => {
    //remember to add catagories
    const { businessName, password, contactno, address } = req.body

    if (!businessName || !password || !address || !contactno) {
        return res.status(400).json({ message : 'All fields are required'})
    }

    const duplicate = await Business.findOne({ businessName }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate businessName'})
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const businessObject = { businessName, "password": hashedPwd, contactno, address}

    const business = await Business.create(businessObject)

    if (business) {
        res.status(201).json({ message: `New business ${businessName} submitted`})
    } else {
        res.status(400).json({ message: 'Invalid business data received'})
    }
})

const updateBusiness = asyncHandler(async (req, res) => {
    const { id, businessName, address, disc , password } = req.body

    if (!id || !businessName || !address || !disc || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const business = await Business.findById(id).exec()

    if (!business) {
        return res.status(400).json({ message: 'business not found' })
    }

    const duplicate = await Business.findOne({ businessName }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate businessName' })
    }

    business.businessName = businessName
    business.address = address
    business.disc = disc

    if (password) {
        business.password = await bcrypt.hash(password, 10)
    }

    const updatedBusiness = await business.save()

    res.json({ message: `${updatedBusiness.businessName} updated` })

})

const deleteBusiness = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    const business = await Business.findById(id).exec()

    if (!business) {
        return res.status(400).json({ message: 'Business not found' })
    }

    const result = await business.deleteOne()

    const reply = `businessName ${result.businessName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllBusinesses,
    createNewBusiness,
    updateBusiness,
    deleteBusiness
}