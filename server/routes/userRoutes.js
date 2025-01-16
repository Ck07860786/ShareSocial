import express from 'express'
import { getAllSubmissions, submitHandleController } from '../controllers/userController.js'
import ExpressFormidable from "express-formidable";
const router = express.Router()


router.post('/submit-detail',ExpressFormidable({multiples:true}),submitHandleController)
router.get('/submissions',getAllSubmissions)

export default router;