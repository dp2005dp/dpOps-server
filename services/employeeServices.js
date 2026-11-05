import db from "../config/db.js"
import bcrypt from "bcryptjs"
import { getIO } from "../socket/socket.js"

export const crateEmployee = async (data , file) => {
    try {
        const {
            username,
            password ,
            fullName,
            email,
            phone,
            role,
            department,
            joinDate,
            experienceYears,
            employmentType,
            streetAddress,
            city,
            state,
            country,
            zipCode,
            aboutEmployee
        } = data

        console.log(data)
        
        if(!username || !password) {
            throw new Error('Username and password are required')
        }

        const [row] = await db.query(`SELECT * FROM employees WHERE username = ?` , [username])
        
        if (row.length >=1) {
          throw new Error('Username Already Exists')
        }

        const hashPassword = await bcrypt.hash(password , 10)

        const insertQuery = `
          INSERT INTO employees(
            fullName,	
            email,
            phone ,
            role,
            department ,	
            profilePhoto,
            joinDate ,
            experienceYears,
            employmentType,	
            streetAddress	,
            city,	
            state,
            country,
            zipCode ,
            aboutEmployee,
            passwordHash ,
            username	
          )

          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `

        const [result] = await db.query(insertQuery , [
            fullName , email ,phone , role ,department , file.originalname , joinDate ,experienceYears , employmentType ,
            streetAddress , city , state ,country ,zipCode ,aboutEmployee , hashPassword ,`EMP${username}` 
        ])

        const [[getEmployee]] = await db.query(`SELECT * FROM employees WHERE employeeId = ?` , [result.insertId])

        getIO().emit('get Employee' , getEmployee)

        return result
    }

    catch(e){
        console.log(e , 'faild employee Services')
        throw e
    }
}

export const getAllEmployess = async () => {
    try {
         const getQuery = `
            SELECT * FROM employees 
         `

         const [result] = await db.query(getQuery)

         return result
    }

    catch(e) {
         console.log('Failed Gell All Employess' , e)
         throw e
    }
}

export const getEmployeeById = async (id) => {
      try {
          const getQuery = `
            SELECT * FROM employees WHERE employeeId = ?
          `

          const [result] = await db.query(getQuery , [id])

          return result
      }

      catch(e) {
         console.log(e , 'Failed Get By id employee')
         throw e
      }
}