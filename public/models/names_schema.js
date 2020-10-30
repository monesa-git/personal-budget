const mongoose = require("mongoose")

// validate it is number
// validate is the value has been passed
// find by id --> document then id is found else --> we ca use this id

const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
}, {collection : 'chart_value_collection'})


module.exports = mongoose.model('chart_value_collection', nameSchema)