const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Specifications: {
        type: String,
        required: true

    },
    Dimensions: {
        type: String,
        required: true

    },
    Material: {
        type: String,
        required: true

    },
    Image1: {
        type: String,
        required: true

    }, 
    Image2: {
        type: String,
        required: true

    },
     Image3: {
        type: String,
        required: true

    }
});

module.exports = mongoose.model('Products', productSchema);