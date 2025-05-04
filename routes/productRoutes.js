import express from 'express';
//import productController from '../controllers/productController.js';
import {
    addProduct,
    getAllProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', addProduct);

//router.post('/users', productController.createUser);
//router.get('/users', productController.getUsers);
//router.get('/users/:id', productController.getUserById);
//router.put('/users/:id', productController.updateUser);
//router.delete('/users/:id', productController.deleteUser);

export default router;
