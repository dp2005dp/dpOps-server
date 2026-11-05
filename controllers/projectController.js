import { createProject , getAllProjects , getProjectById , UpdateProjectStatus } from "../services/projectServices.js";

export const createProjectCon = async (req , res) =>{
    try {
       
       const response = await createProject(req.body , req.file)

      return res.status(200).json({
        message : 'Project Created Successfully',
        data : response
      })    
    }

    catch(e){
        console.log(e , 'Failed Project Services')
        return res.status(500).json({
        message : 'Project Created Failed',
      }) 
    }
}

export const getAllProjectCon = async (req , res) => {
        try {
          const response =   await getAllProjects()

          return res.status(200).json({
              message : 'get All Projects',
              data : response
          })
        }

        catch(e){
           console.log(e, 'Failed Get All ProjectsCon')
            return res.status(500).json({
              message : 'Failed Get Method',
          })
        }
}

export const getByIdCon = async (req , res) => {
   
   const {projectId} = req.params

   try {
       const response = await getProjectById(projectId)

       return res.status(200).json({
         message : 'success',
         data : response
       })
   }

   catch(e){
    console.log(e , 'failed GetById with Con')

    return res.status(500).json({
         message : 'Failed Get Project',
       })
   }
}

export const UpdateProjectStatusCon = async (req, res) => {
      try{
         const {projectId} = req.params
         const {status} = req.body
         const response = await UpdateProjectStatus(projectId , status)

         return res.status(200).json({
           message : 'Project Status Updated',
           data : response
         })
      }
      catch(e){
        console.log(e, 'Project Status Updated Failed Con')
        return res.status(500).json({
           message : 'Project Status Updated Failed',
         })
      }
}