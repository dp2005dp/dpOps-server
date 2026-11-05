import multer from "multer";

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        if (file.fieldname === 'image') {
            cb(null , 'uploads/Reports')
        }
        else {
            cb(new Error('File Not Support') , false)
        }
    },
    filename : (req,file,cb) => {
         cb(null  , file.originalname)
    }
})

const fileFilter  = (req , file , cb) => {
      if (file.fieldname === 'image'&& ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype) )  {
         cb(null , true)
      }

      else {
         cb(new Error('File Not Support') , false)
      }
}

const reportsFiles = multer({
    storage,
    fileFilter
})

export default reportsFiles;