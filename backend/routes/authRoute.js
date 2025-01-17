import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController} from '../controllers/authController.js'
import {requireSignIn, isAdmin} from "../middlewares/authMidleware.js";
//route object
const router = express.Router()

//register || method post
router.post('/register', registerController)

//login || post
router.post('/login', loginController)

//forgot Password || POST
router.post('/forgot-password',forgotPasswordController);

//test rotes
router.get('/test',requireSignIn,isAdmin, testController)

//protected user route auth
router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ok: true});
});

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok: true});
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get('/orders',requireSignIn, getOrdersController);

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

//all users
router.get('/all-users', getAllUsersController);
export default router;