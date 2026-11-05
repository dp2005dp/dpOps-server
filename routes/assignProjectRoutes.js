import {assignProjectCon ,assignProjectEmployessConWithProjectId , assignProjectEmployessCon  , getEmployeeProjectCon , getProjectProgressCon} from "../controllers/assignProjectControllers.js"
import express from 'express'
import { verifyToken} from "../middlewares/authMiddleware.js"
import { EmployeeverifyToken } from "../middlewares/EmployeeVerify.js"
const assignProRoutes = express.Router()

assignProRoutes.post('/assignProject' , verifyToken,  assignProjectCon)
assignProRoutes.get('/getAssignEmployessWithProjectId/:id' ,verifyToken , assignProjectEmployessConWithProjectId)
assignProRoutes.get('/getAssignEmployessWithProjectIdByEmployee/:id' ,EmployeeverifyToken , assignProjectEmployessConWithProjectId)
assignProRoutes.get('/getAssignEmployess' ,verifyToken , assignProjectEmployessCon)
assignProRoutes.get('/adminGetEmployeeProjects/:id' ,verifyToken , getEmployeeProjectCon)
assignProRoutes.get('/getEmployeeProjects/:id' , EmployeeverifyToken,  getEmployeeProjectCon)
assignProRoutes.get('/getProjectProgress' , verifyToken , getProjectProgressCon)
export default assignProRoutes;