const express = require('express')
const router = express.Router()
const UserC = require('../controllers/userController')
const ProductC = require('../controllers/productController')
const OrderC = require('../controllers/orderController')
const payC = require('../controllers/paymentController')
const {authentication, orderAuth} = require('../middleware/auth') 
// user
router.post('/login', UserC.login)
router.post('/register', UserC.register)

router.post('/products/', ProductC.postProduct)
router.get('/products/:id', ProductC.getProducts)
router.get('/products/', ProductC.getProducts)
router.put('/products/:id', ProductC.putProduct)
router.delete('/products/:id', ProductC.delProduct)

router.post('/orders/', authentication, OrderC.postOrder)
router.get('/orders/', authentication, OrderC.getOrders)
router.get('/orders/:id', authentication, OrderC.getOrders)
router.patch('/orders/:id', authentication, orderAuth, OrderC.patchOrder)
router.delete('/orders/:id', authentication, orderAuth, OrderC.delOrder)

router.post('/pay/:orderId', authentication, payC.postPayment)
router.get('/payment/:id', authentication, payC.getPayment)
router.get('/payment/', authentication, payC.getPayment)

router.use((req, res, next) => next({name:"notFound", message:"404 not found"}))
module.exports = router