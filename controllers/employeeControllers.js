import {crateEmployee , getAllEmployess , getEmployeeById} from "../services/employeeServices.js"

export const crateEmployeeCon = async (req , res) => {
    
    try {
        const response = crateEmployee(req.body , req.file)

        return res.status(200).json({
             message : 'Employee create SuccessFully',
             data : response
        })

    }

    catch(e) {
         console.log(e, 'Failed employee controllers')
         
         return res.status(500).json({
             message : 'Failed created Employee'
        })

    }
}

export const getAllEmployessCon = async (req , res) => {
      try {
           const response = await getAllEmployess()

        return res.status(200).json({
            message: 'Get All Employess Success',
            data : response
        })
      }

      catch(e) {
           console.log('Failed Get All Employesscon' , e)
            return res.status(200).json({
                    message: 'Get All Employess Success',
                    data : response
            })
      }
}

export const getEmployeeByIdCon = async (req , res) => {
     
    const {id} = req.params

     try {
         const response = await getEmployeeById(id)

         return res.status(200).json({
            message : 'Get Employee Success',
            data : response
         })
     }
     catch (e) {
         console.log(e , 'Failed Get EmployeeCon')
          return res.status(500).json({
            message : 'Get Employee Failed'
         })
     }
}