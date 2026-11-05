import db from '../config/db.js'

export const employeeLogin = async (username , password) => {
       try {
           
        console.log(username , password)

          const checkQuery = `
           SELECT * FROM employees

           WHERE username = ?
          `
         
          const [result] = await db.query(checkQuery , [username])
           console.log('result[0]' , result)
          return result[0]

         

       }
       catch(e) {
         console.log(e, 'faild User Login services')
       }
}