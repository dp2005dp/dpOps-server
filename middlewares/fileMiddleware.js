import multer from "multer";

const storage = multer.diskStorage({
    destination : (req , files , cb) => {
       
        if(files.fieldname === 'file') {
             cb(null , 'uploads/projectFiles/')
        }
        else {
    cb(new Error("File not supported"), false);
  }
    },
    
    filename : (req , files , cb) => {
         cb(null , files.originalname)
    }
})

const fileFilter = (req, files , cb) => {
     if (files.mimetype === 'application/pdf') {
         cb(null , true)
     }

     else {
         cb(new Error('files not supported') , false)
     }
}

const upload = multer({
    storage,
    fileFilter
})

export default upload;