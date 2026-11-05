import {createReports , getReports} from "../services/reportsServices.js"

export const createReportCon = async (req , res) => {
      try{
        const response = await createReports(req.body , req.file)

        return res.status(200).json({
            message : 'Reports Submit successfully',
            data : response
        })
      }
      catch(e){
        console.log(e,'Reports Submit Failed Controllers')
         return res.status(500).json({
            message : 'Reports Submit Failed',
        })
      }
}

export const getReportsCon = async (req , res) => {
         try{
            const {employeeId } = req.params
            const response = await getReports(employeeId)

            return res.status(200).json({
                message : 'Successfull get reports',
                data : response
            })
         }
         catch(e){
            console.log(e , 'Failed Get Reports Controllers')
            return res.status(500).json({
                message : 'Failed Get Reports'
            })
         }
}