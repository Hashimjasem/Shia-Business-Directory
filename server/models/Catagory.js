const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    catagoryName: {
        type: String,
        required: true
    },
    businesses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Businesses'
    }]
})

module.exports = mongoose.model('Business', businessSchema)