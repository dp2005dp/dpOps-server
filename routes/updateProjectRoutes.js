import { UpdateProjectStatusCon } from "../controllers/updateProjectControllers.js";
import express from 'express'
import { EmployeeverifyToken } from "../middlewares/EmployeeVerify.js"

const updateProjactStatusRoutes = express.Router()

updateProjactStatusRoutes.put('/updateProjectStatus/:projectId' ,EmployeeverifyToken , UpdateProjectStatusCon)

export default updateProjactStatusRoutes