const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    product_type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    image_urls: {
        type: [String], // Array of strings
        required: true
    },
    affilate_url: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('tbl_products', ProductSchema);
