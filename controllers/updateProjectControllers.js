import { updateProjectStatus } from "../services/UpdateProjectsServices.js";

export const UpdateProjectStatusCon = async (req , res) => {
     try{
        const {projectId} = req.params
        const response = await updateProjectStatus(req.body , projectId)

        return res.status(200).json({
            message : 'Project Status Updated Successfull',
            data : response
        })
     }
     catch(e){
        console.log('Faild Update Project Status Controllers' , e)
        return res.status(500).json({
            message : 'Faild Update Project Status',
        })
     }
}