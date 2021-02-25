const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("253144225575-s1bjpvji0j3qh3m6sv8daknic2tvu07f.apps.googleusercontent.com")
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const JWT_SECRET = process.env.JWT_SECRET

const generateJWTToken = (userData) => {
    return jwt.sign(userData, JWT_SECRET, {expiresIn:"15d"})
}

module.exports.googleLogin = async (req, res) => {
    const tokenId = req.body.tokenId
    client.verifyIdToken({idToken:tokenId, audience:"253144225575-s1bjpvji0j3qh3m6sv8daknic2tvu07f.apps.googleusercontent.com"})
    .then((response) => {
        console.log('verified token')
        const email_verified = response.getPayload().email_verified
        const name = response.getPayload().name 
        const email = response.getPayload().email
        const picture = response.getPayload().picture        
        if(email_verified){
            User.findOne({email}, (err, user) => {
                if(err){
                    return res.json({
                        success:false,
                        error: err
                    })
                }
                if(user){
                    const token = generateJWTToken({_id:user._id})
                    const name = user.name
                    const picture = user.picture
                    res.cookie('token', token, {httpOnly: true})
                    res.json({
                        token,
                        user: {name, picture}
                    })
                }else{
                    console.log('creating new user');
                    const newUser = new User({name, email, picture})
                    newUser.save()
                    .then((newUser) => {
                        console.log('created new user')
                        const token = generateJWTToken({_id:newUser._id})
                        res.cookie('token', token, {httpOnly: true})
                        const _id = newUser._id
                        const name = newUser.name
                        const picture = newUser.picture
                        res.json({
                            token,
                            user: {name, picture}
                        })
                    })
                    .catch((err) => {
                        res.json({
                            success:false,
                            error:err
                        })
                    })
                }
            })
        }else{
            return res.json({
                success:false,
                error:'Email not verified'
            })
        }
        
        console.log(response.getPayload())
        
    })
}