import { createReportCon , getReportsCon } from "../controllers/reportsControllers.js";
import express from 'express'
import reportsFiles from "../middlewares/reportsFiles.js";
import { EmployeeverifyToken } from "../middlewares/EmployeeVerify.js"
const reportsRoutes = express.Router()

reportsRoutes.post('/reports' , reportsFiles.single('image'), createReportCon)
reportsRoutes.get('/getReports/:employeeId' , EmployeeverifyToken ,  getReportsCon)
export default reportsRoutes