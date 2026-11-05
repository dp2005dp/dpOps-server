import multer from "multer";

const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        if (file.fieldname === 'profilePhoto') {
            cb(null , 'uploads/employeeProfiles/')
        }

        else {
             cb(new Error('file Not Supported'))
        }
        
    },

    filename : (req , file , cb) => {
        cb(null , file.originalname)
    }
})

const  fileFilter = (req,file,cb) => {
     if (file.fieldname === 'profilePhoto' && ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
         cb(null , true)
     }
     
     else {
         cb(new Error('file not supported') , false)
     }
    }

const employeeProfiles = multer({
    storage,
    fileFilter
})

export default employeeProfiles