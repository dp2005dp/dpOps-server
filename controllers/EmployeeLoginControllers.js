import {employeeLogin} from "../services/EmployeeLogin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const securtKey = 'dpops@jwtToken'

export const employeeLoginCon = async (req , res) => {
        try {
             const {username , password} = req.body
             const {employeeId} = req.params
             
             const employee = await employeeLogin(username , password)

             if(!employee) {
                 console.log('Employee Not Found')
                 return res.status(401).json({
                    message : 'Employee Not Found'
                 })
             }

             if (employee.username !== username) {
                 console.log('Invaild username')
                 return res.status(401).json({
                    message : 'Invaild username'
                 })
             }

             const hashPassword = await bcrypt.compare(password , employee.passwordHash)
              console.log('Hasj' , hashPassword)
             if (!hashPassword) {
                 return res.status(401).json({
                    message : 'Invaild Password'
                 })
             }

             
             const token = jwt.sign({
                username : employee.username,
                
             } , securtKey , {
                expiresIn : '1d'
             })

             return res.status(200).json({
                message : 'Login Successfull',
                data : employee.employeeId,
                token
             })

        }
        catch(e){
            console.log(e , 'Failed Employee Login Con')
            return res.status(500).json({
                message : 'Login Faild',
             })
        }
}