import express from 'express'
import { loginController, registerController } from '../controllers/adminController.js';

const router = express.Router();




router.post('/admin-signup',registerController)
router.post('/admin-login',loginController)


export default router;