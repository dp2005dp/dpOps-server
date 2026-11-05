import { loginControllers } from "../controllers/AdminLoginCroller.js";
import express from 'express'

const loginRoutes = express.Router()

loginRoutes.post('/login' , loginControllers)

export default loginRoutes;