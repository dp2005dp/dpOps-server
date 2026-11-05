import jwt from "jsonwebtoken";

const secretKey = 'Admin@123'

export const verifyToken = (req, res, next) => {
    try {
        // Get token from request header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];
    
        // Verify token
        const decoded = jwt.verify(token, secretKey);
     
        // Store decoded information in request
        req.admin = decoded;
        
        // Allow next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};