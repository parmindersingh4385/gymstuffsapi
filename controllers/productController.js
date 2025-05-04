const axios = require('axios');
const Product = require('../models/product.js');

const getProductModel = function (jsonData, productType) {
    const productInfo = jsonData.productBaseInfoV1;

    let dataObj = {
        title: productInfo.title,
        product_id: productInfo.productId,
        type: productType,
        brand: productInfo.productBrand,
        discount: productInfo.discountPercentage,
        price: {
            max_price: productInfo.maximumRetailPrice.amount,
            flipkart: productInfo.flipkartSpecialPrice.amount
        },
        image_urls: Object.values(productInfo.imageUrls),
        affilate_url: {
            flipkart: productInfo.productUrl
        }
    };

    return dataObj;
};

const isProductExists = async function (productId) {
    let isExists = false,
        productRecord = await Product.exists({ product_id: productId });

    if (productRecord) {
        isExists = true;
    }

    return isExists;
};

exports.addProduct = async (req, res) => {
    const productId = req.body.id,
        productType = req.body.type;

    try {
        const result = await axios.get(
            `https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=${productId}`,
            {
                headers: {
                    'Fk-Affiliate-Id': 'singh1par',
                    'Fk-Affiliate-Token': '12c4b98208f84870b0a4f5e528f69770'
                }
            }
        );

        if (
            (await isProductExists(result.data.productBaseInfoV1.productId)) ==
            true
        ) {
            res.status(201).json({
                message: 'Product already exists'
            });
        } else {
            const product = new Product(
                getProductModel(result.data, productType)
            );

            await product.save();
            res.status(201).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductByType = async (req, res) => {
    const productType = req.params.type;
    try {
        const product = await Product.find({ type: productType });
        res.status(200).json({
            total_count: product.length,
            data: product
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            total_count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
