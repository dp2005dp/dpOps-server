import bcrypt, { hash } from "bcryptjs";
import jwt from 'jsonwebtoken'

const adminDetails = {
    username : 'dpops',
    password : 'dpops@123'
}

const secretKey = 'Admin@123'

export const loginControllers = async  (req,res) => {
 
     try{ 
         
        const hashpassword = await hash(adminDetails.password , 10)
           
        const {username , password} = req.body
        console.log(username , password)

        if (username !== adminDetails.username) {
            return res.status(400).json({
                message : 'Invaild Username'
            })
        }
        
        const comparePassword = await bcrypt.compare(password ,  hashpassword)
        console.log(comparePassword)
        if (!comparePassword) {
            return res.status(400).json({
                message : 'Invaild Password'
            })
        }

        const token = jwt.sign({
           username : adminDetails.username
        } , secretKey , {expiresIn : '1d'} )

        res.status(200).json({
            message : 'Admin Login Successfull',
            token
        })

     }
     catch(e){
        console.log(e, 'Failed Admin Login Controller')
      
        res.status(500).json({
            message : 'Admin Login Failed',
        })
     }
}