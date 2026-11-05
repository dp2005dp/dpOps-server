import db from "../config/db.js"
import { getIO } from "../socket/socket.js"

export const  createReports = async (data , file) => {
   try{
       const {
            projectName ,
            reportTitle ,
            reportNote ,
            projectId,
            employeeId
       } = data

       const insertQuery = `
           
                INSERT INTO project_reports( 
                    projectId,
                    employeeId ,
                    projectName	,
                    reportTitle	,
                    description	,
                    file
                )

                VALUES(?,?,?,?,?,?)
        `

        const [result]  = await db.query(insertQuery , [
            projectId , employeeId , projectName , reportTitle ,reportNote , file.originalname
        ])

        const [[getReports]] = await db.query(`SELECT * FROM project_reports WHERE reportId = ?` , [result.insertId])

        getIO().emit('get Reports' , getReports)

        return result
   }
   catch(e){
      console.log(e,'Failed create reports services')
      throw e;
   }
}

export const getReports = async (employeeId ) => {
      try{
        const getQuery = `
            SELECT * FROM project_reports 
            WHERE employeeId  = ?
        `

        const [result] = await db.query(getQuery , [employeeId])

        return result
      }
      catch(e){
        console.log(e, 'faild Get Reports services')
        throw e
      }
}