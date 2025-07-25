import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

export const protect = async (req, res, next)=>{
    try{ 
        const headerObj = req.headers
        const token = req.cookies?.jwt || headerObj?.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({message:'Token not Provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
        }
        next()

    }catch(error){
        return res.status(401).json({message: 'Authentication failed', error:error.message})    
    }
}

export const Admin = expressAsyncHandler(async(req, res, next)=>{
    if(!req.user?.isAdmin){
        res.status(400)
        res.json({
            success: false,
            message: 'Access Denied, Admin only.'
        })
    }
    next()
})