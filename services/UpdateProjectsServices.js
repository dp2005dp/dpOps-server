import db from "../config/db.js"
import { getIO } from "../socket/socket.js"

export const updateProjectStatus =async  (data ,projectId) => {
   
  try{
     
      const {assignedRole, progress , roleStatus } = data

    const updateQuery = `
       
      UPDATE project_roles 

      SET roleStatus =?,
          progress =?
      
      WHERE projectId  = ? AND roleName = ?
    
    `
    const [result] =await db.query(updateQuery , [
          roleStatus , progress , projectId , assignedRole
    ])

    const [[updateStatus]] = await db.query(`SELECT * FROM project_roles WHERE projectRoleId = ?` , [result.insertId])
    
    getIO().emit('Update Project Status' , updateStatus)

    return result;

  }
  catch(e){
    console.log('Failed Update Project Status Services' , e)
    throw e
  }

}