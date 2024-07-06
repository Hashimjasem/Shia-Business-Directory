const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // catagory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Catagory'
    // },
    contactno:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    disc: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Business', businessSchema)