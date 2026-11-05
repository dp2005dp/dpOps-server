import db from "../config/db.js"
import { getIO } from "../socket/socket.js"

export const createProject = async (data , file) => {
    try {
         const {
           clientName,
            companyName,
            email,
            phone,
            projectName,
            projectDescription,
            projectType,
            priority,
            startDate,
            deadline,
            budget,
            projectStatus,
            roles
         } = data
  
    
    if(!clientName || !companyName || !email || ! phone)
       throw new Error('fill all fileds')
    
    const insertQuery = `
        INSERT INTO projects(
        clientName ,	
        clientPhone	 ,
        ClientCompany ,
        ClientEmail	, 
        projectName	,
        projectDescription	,
        projectType	,
        priority	,
        startDate ,
        deadline,
        budget,
        projectStatus ,
        projectFile,
        roles
        )
        
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `
    
    const [result] = await db.query(insertQuery , [ clientName , phone ,companyName ,
        email ,projectName , projectDescription ,projectType ,priority ,startDate ,
        deadline ,budget ,projectStatus , file.originalname , roles
    ])
     
    const projectRolesQuery = `
       INSERT INTO project_roles(
        projectId,
        roleName,
        roleStatus,
        progress	
        )
        VALUES(?,?,?,?)
    `
    const projectId = result.insertId
   
    const parsedRoles = typeof roles === "string"? roles.split(",") : roles;

    for (const role of parsedRoles) {
        await db.query(projectRolesQuery , [
            projectId , role , 'Not Started' , 0
        ])
    }

    const [[getProject]] = await db.query('SELECT * FROM projects WHERE projectId = ?' , result.insertId)
    
    getIO().emit('get Project' , getProject)

     return {projectId , ... result}

    }
   
    catch(e){
        console.log(e , 'project sevices failed')
        throw e
    }
}


export const getAllProjects = async () => {
    try {
         
        const getQuery = `
          SELECT * FROM projects ORDER BY createdAt DESC
        `

        const [result] = await db.query(getQuery)
      
        return result
    }

    catch(e) {
         console.log(e , 'Get projects failed')
    }
}

export const getProjectById = async (projectId) => {

     try {
         const getQuery  = `
         SELECT * FROM projects WHERE projectId = ?
         `
         const [result] = await db.query(getQuery , [projectId])
         return result[0]
     }

     catch(e) {
        console.log('Failed GetById')
     }
}


export const UpdateProjectStatus = async (projectId , status) => {
       try {
          const upadeteQuery = `
           
          UPDATE projects 
            SET projectStatus = ?

            WHERE projectId = ?
          `

          const [result] = await db.query(upadeteQuery , [status ,projectId])
         
          const [[updateStatus]] = await db.query(`SELECT * FROM projects WHERE projectId = ?` , [projectId])
          
          getIO().emit('UpdateStatus' , updateStatus)

         return result
       }
       catch(e){
        console.log(e ,'failed Update Status Services')
        throw e
       }
}