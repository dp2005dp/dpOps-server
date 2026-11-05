import express from "express"
import cors from 'cors'
import pool from "./config/db.js"
import ProjectRoutes from "./routes/projectRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import assignProRoutes from "./routes/assignProjectRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import { verifyToken } from "./middlewares/authMiddleware.js"
import updateProjactStatusRoutes from "./routes/updateProjectRoutes.js"
import reportsRoutes from "./routes/reportsRoutes.js"
import employeeLoginRoutes from "./routes/employeeLoginRoutes.js"
import path from "path"
import { EmployeeverifyToken } from "./middlewares/EmployeeVerify.js"
import {initSocket} from "./socket/socket.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads' , express.static(path.join(process.cwd() , 'uploads')))
app.use('/api' , ProjectRoutes)
app.use('/api' , employeeRoutes)
app.use('/api', assignProRoutes)
app.use('/api', loginRoutes)
app.use('/api', updateProjactStatusRoutes)
app.use('/api' , reportsRoutes)
app.use('/api' , employeeLoginRoutes)
app.use(verifyToken)
app.use(EmployeeverifyToken)

const startServer = async () => {
    try{
    const server = app.listen(5000 , () =>{
            console.log('server start successfully')
        })
     
      initSocket(server)

       await pool.getConnection()
    }

    catch(e) {
        console.log(e)
    }
}

startServer()