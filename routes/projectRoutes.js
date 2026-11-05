import {createProjectCon  , getAllProjectCon , getByIdCon , UpdateProjectStatusCon} from "../controllers/projectController.js"

import express from 'express'
import upload from "../middlewares/fileMiddleware.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { EmployeeverifyToken } from "../middlewares/EmployeeVerify.js"
const ProjectRoutes  = express.Router()

ProjectRoutes.post('/addProject' ,verifyToken,upload.single('file') , createProjectCon)
ProjectRoutes.get('/getAllProjects' , verifyToken,getAllProjectCon)
ProjectRoutes.get('/getById/:projectId' ,verifyToken, getByIdCon)
ProjectRoutes.get('/getByIdByEmployee/:projectId' ,EmployeeverifyToken, getByIdCon)
ProjectRoutes.put('/updateStatus/:projectId' , verifyToken , UpdateProjectStatusCon)
export default  ProjectRoutes;