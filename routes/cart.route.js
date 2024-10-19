const express = require('express');
const auth = require('../middleware/auth');
const { cartController } = require('../controller');
const cartRoute = express.Router()

cartRoute.route('/add')
    .post(auth, cartController.handleAddProductToCart)

cartRoute.route('/remove/:productId')
    .delete(auth, cartController.handleRemoveProductFromCart)

cartRoute.route('/update/:productId')
    .put(auth, cartController.handleUpdateProductQuantityInCart)

cartRoute.route('/get')
    .get(auth, cartController.handleGetCartItems)
    
cartRoute.route('/get/:productId')
    .get(auth, cartController.handleGetCartItemById);

cartRoute.route('/total')
    .get(auth, cartController.handleGetCartTotal)

cartRoute.route('/empty')
    .delete(auth, cartController.handleEmptyCart)





module.exports = cartRoute