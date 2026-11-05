import {createAssignProject , getAllAssignEmployessWithProjectId ,getAllAssignEmployess , getEmployeeProject , getProjectProgress} from "../services/assignProjectServices.js"

export const assignProjectCon  = async (req , res) => {
     try{
        const resonse = await createAssignProject(req.body)

        return res.status(200).json({
            message : 'Assign Project Successfull',
            data : resonse
        })
     }
     
     catch(e){
        console.log(e,"Failed Assign Project Controllers")

        return res.status(500).json({
            message : 'Assign Project Failed'
        })
     }
}

export const assignProjectEmployessConWithProjectId = async (req , res) => {
     try {
          
        const {id} = req.params

         const response = await getAllAssignEmployessWithProjectId(id)

        return res.status(200).json({
            message : 'Get Assign Project Employess Successfull',
            data : response
        })
     }
     catch(e){
         console.log(e, 'Faild Assign Employess Con')

         return res.status(500).json({
            message : 'Get Assign Project Employess Successfull'
        })
     }
}

export const assignProjectEmployessCon = async (req , res) => {
     try {

         const response = await getAllAssignEmployess()

        return res.status(200).json({
            message : 'Get Assign Project Employess Successfull',
            data : response
        })
     }
     catch(e){
         console.log(e, 'Faild Assign Employess Con')

         return res.status(500).json({
            message : 'Get Assign Project Employess Successfull'
        })
     }
}

export const getEmployeeProjectCon = async (req, res) => {
      try {
         const {id} = req.params
          const response = await getEmployeeProject(id)

        return res.status(200).json({
            message : 'Get Employee Projects Successfull',
            data : response
        })
      }

      catch(e){
         console.log(e ,'Faild get Employess Project contrillers')
         
          return res.status(500).json({
            message : 'Faild get Employess Project contrillers'
        })
         
      }
}

export const getProjectProgressCon = async (req ,res) => {
             try{
                const response = await getProjectProgress()

                return res.status(200).json({
                    message : 'Get Progress Successfull',
                    data : response
                })
             }
             catch(e){
                console.log(e , 'Failed Progress con')
                return res.status(200).json({
                    message : 'Failed Progress'
                })
             }
}