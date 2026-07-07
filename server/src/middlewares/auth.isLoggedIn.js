import jwt from 'jsonwebtoken'
import User from '../models/user.js'

module.exports.isLoggedIn = async function (req,res,next) {
    try{
        if(!req.cookies.Token)
        {
            res.send('Login Again')
        }
        else
        {
        let decoded = await jwt.verify(req.cookies.Token , process.env.JWT_SECRET)
        let user = await User.findById(decoded._id).select('-password')
        if (!user) {
        return res.send("User Not Found Retry ....");
        }               
        req.user = user
        next()
        }
    }catch(error)
    {
        console.log(error.message)
        req.flash('error','Something Went Wrong')
        return res.redirect("/");
    }
}