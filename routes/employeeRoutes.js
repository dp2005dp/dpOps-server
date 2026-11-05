import express from 'express'
import { crateEmployeeCon  , getAllEmployessCon , getEmployeeByIdCon} from '../controllers/employeeControllers.js'
import employeeProfiles from "../middlewares/profilePhoto.js"
import { verifyToken } from '../middlewares/authMiddleware.js'
import { EmployeeverifyToken } from "../middlewares/EmployeeVerify.js"

const employeeRoutes = express.Router()

employeeRoutes.post('/addEmployee' , verifyToken, employeeProfiles.single('profilePhoto') , crateEmployeeCon)
employeeRoutes.get('/getAllEmployess' ,verifyToken , getAllEmployessCon)
employeeRoutes.get('/adminGetById/:id' , verifyToken ,getEmployeeByIdCon)
employeeRoutes.get('/getemployeeById/:id' ,EmployeeverifyToken ,getEmployeeByIdCon)

export default employeeRoutes