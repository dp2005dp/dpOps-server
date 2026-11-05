import { employeeLoginCon } from "../controllers/EmployeeLoginControllers.js";
import express from 'express'

const employeeLoginRoutes = express.Router()

employeeLoginRoutes.post('/employeeLogin' , employeeLoginCon)

export default employeeLoginRoutes