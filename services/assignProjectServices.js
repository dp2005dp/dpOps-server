import db from "../config/db.js"
import { getIO } from "../socket/socket.js"

export const createAssignProject = async (data) => {
    try{
        const {
        projectId,
        assignedRole,
        username 
        } = data

        const insertQuery = `
          INSERT INTO assignproject_employees(
           	projectId,
            employeeId,
            assignedRole
          )
          VALUES(?,?,?)
        `

       const [result]  = await db.query(insertQuery , [
         projectId ,username ,assignedRole
       ])

      
       const [[getResult]] = await db.query(  `SELECT * FROM assignproject_employees WHERE projectEmployeeId = ?` , [result.insertId])
       
       getIO().emit('get assignEmployess' , getResult)

       return result
    }
    catch(e){
        console.log(e, 'Failed To Assign Post Method')
        throw e
    }
}

export const getAllAssignEmployessWithProjectId = async (projectId) => {
    try{
       const getQuery = ` 
        
         SELECT asp.assignedRole ,  e.fullName , e.	role, e.profilePhoto , pr.roleName , pr.roleStatus , pr.progress
         
         FROM assignproject_employees asp JOIN employees e ON asp.employeeId = e.employeeId

         JOIN project_roles pr ON asp.projectId = pr.projectId AND pr.roleName = asp.assignedRole

         WHERE asp.projectId = ?

         GROUP BY asp.assignedRole ,  e.fullName , e.	role, e.profilePhoto , pr.roleName , pr.roleStatus , pr.progress
       
       `

      const [result] = await db.query(getQuery , [projectId])

      return result
    }
    catch(e){
      console.log(e, 'Failed Assign Get Employess')
    }
}

export const getAllAssignEmployess = async () => {
    try{
       const getQuery = ` 
        
         SELECT asp.assignedRole , asp.projectId,  e.fullName , e.role, e.profilePhoto , pr.roleName , pr.roleStatus
         
         FROM assignproject_employees asp JOIN employees e ON asp.employeeId = e.employeeId

         JOIN project_roles pr ON asp.projectId = pr.projectId AND pr.roleName = asp.assignedRole


         GROUP BY asp.assignedRole ,  e.fullName , e.	role, e.profilePhoto , pr.roleName , pr.roleStatus ,asp.projectId
       
       `

      const [result] = await db.query(getQuery)

      return result
    }
    catch(e){
      console.log(e, 'Failed Assign Get Employess')
    }
}

export const getEmployeeProject = async (id) => {
  try {
     const getQuery = `
       
        SELECT ae.assignedRole , p.projectName , pr.roleStatus , p.startDate , p.deadline , p.projectType , pr.progress , p.ClientCompany ,p.projectDescription
        ,p.startDate,p.deadline,p.projectId
        
        FROM assignproject_employees ae JOIN projects p 
         
        ON ae.projectId = p.projectId JOIN  project_roles pr ON  pr.projectId  = ae.projectId   AND pr.roleName = ae.assignedRole

        WHERE ae.employeeId = ?

       GROUP BY ae.assignedRole , p.projectName , pr.roleStatus , p.startDate , p.deadline , p.projectType,pr.progress , p.ClientCompany ,p.projectDescription
        ,p.startDate,p.deadline,p.projectId
     
     `
     
    const [result] = await db.query(getQuery , [id])
   
    return result;

  }

  catch(e) {
      console.log(e, 'faild get Employess projects')
  }
}

export const getProjectProgress = async () => {
      try{
        const getQuery = `SELECT * FROM project_roles`

        const [result]  = await db.query(getQuery)

        return result
      }
      catch(e){
        console.log('Failed Progress Services')
        throw e
      }
}