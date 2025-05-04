import axios from 'axios';
import Product from '../models/product.js';

const getProductModel = function (jsonData, productType) {
    const productInfo = jsonData.productBaseInfoV1;

    let dataObj = {
        title: productInfo.title,
        product_id: productInfo.productId,
        product_type: productType,
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

/* export const addProduct = async function (req, res) {
    const productId = req.params.id;

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
            const product = new Product(getProductModel(result.data));
            await product.save();
            res.status(201).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

export const addProduct = async function (req, res) {
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

export const getAllProducts = async function (req, res) {
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

/* exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; */
